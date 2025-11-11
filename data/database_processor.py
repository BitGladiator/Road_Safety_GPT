import pandas as pd
import json
import os
import glob

def get_project_root():
    """Get the absolute path to the project root"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(current_dir)  

def find_csv_file():
    """Find the CSV file automatically"""
    project_root = get_project_root()
    
    possible_locations = [
        os.path.join(project_root, 'data/raw_database/GPT_Input_DB(Sheet1).csv'),
        os.path.join(project_root, 'data/raw_database/GPT_Input_DB.csv'),
        os.path.join(project_root, 'raw_database/GPT_Input_DB(Sheet1).csv'),
        os.path.join(project_root, 'GPT_Input_DB(Sheet1).csv'),
        'raw_database/GPT_Input_DB(Sheet1).csv',
        'GPT_Input_DB(Sheet1).csv', 
    ]
    
    # Also search for any CSV files
    csv_search_locations = [
        os.path.join(project_root, 'data/raw_database/*.csv'),
        os.path.join(project_root, 'raw_database/*.csv'),
        os.path.join(project_root, '*.csv'),
        '*.csv'
    ]
    for location in possible_locations:
        if os.path.exists(location):
            print(f"Found CSV file: {location}")
            return location
    for location in csv_search_locations:
        files = glob.glob(location)
        if files:
            print(f"Found CSV file: {files[0]}")
            return files[0]
    
    print("Could not find CSV file. Please make sure your CSV file is in one of these locations:")
    for loc in possible_locations + csv_search_locations:
        print(f"  - {loc}")
    return None

def process_database():
    csv_file_path = find_csv_file()
    
    if not csv_file_path:
        return []
    encodings = ['utf-8', 'latin1', 'iso-8859-1', 'cp1252', 'utf-16']
    
    for encoding in encodings:
        try:
            print(f"Trying encoding: {encoding}")
            df = pd.read_csv(csv_file_path, encoding=encoding)
            print(f"Success with encoding: {encoding}")
            break
        except UnicodeDecodeError:
            continue
        except Exception as e:
            print(f"Error with {encoding}: {e}")
            continue
    else:
        print("Could not read file with any encoding. Please check the file format.")
        return []
    
    print(f"Successfully loaded CSV with {len(df)} rows")
    print(f"Columns: {df.columns.tolist()}")
    
    processed_data = []
    
    for _, row in df.iterrows():
        intervention = {
            "intervention_id": row['S. No.'],
            "problem_type": row['problem'],
            "category": row['category'],
            "intervention_name": row['type'],
            "description": str(row['data']),
            "standard_code": row['code'],
            "clause": str(row['clause']),
            "keywords": extract_keywords(row['problem'], row['type'], row['data']),
            "road_types": infer_road_types(row['data'], row['category']),
            "environments": infer_environments(row['data'], row['category'])
        }
        processed_data.append(intervention)
    project_root = get_project_root()
    output_dir = os.path.join(project_root, 'data')
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'processed_database.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, indent=2)
    
    print(f"Processed {len(processed_data)} interventions")
    print(f"Saved to: {output_path}")
    if processed_data:
        print("\nSample intervention:")
        print(json.dumps(processed_data[0], indent=2))
    
    return processed_data

def extract_keywords(problem, intervention_type, description):
    """Extract relevant keywords"""
    keywords = []
    
    # Add problem types
    if isinstance(problem, str):
        keywords.extend(problem.lower().split())
    
    # Add intervention types
    if isinstance(intervention_type, str):
        keywords.extend(intervention_type.lower().split())
    
    # Add common terms
    common_terms = ['speed', 'pedestrian', 'crossing', 'school', 'hospital', 'stop', 
                   'warning', 'mandatory', 'informatory', 'prohibitory', 'urban', 
                   'rural', 'highway', 'expressway', 'residential', 'commercial',
                   'damaged', 'missing', 'faded', 'placement', 'spacing', 'height',
                   'visibility', 'obstruction', 'non-standard', 'wrong colour',
                   'curve', 'curved', 'bend', 'chevron', 'sign', 'marking']
    
    if isinstance(description, str):
        description_lower = description.lower()
        for term in common_terms:
            if term in description_lower:
                keywords.append(term)
    
    return list(set(keywords))

def infer_road_types(description, category):
    """Infer suitable road types"""
    road_types = []
    
    if isinstance(description, str):
        desc_lower = description.lower()
        
        if 'urban' in desc_lower or 'city' in desc_lower:
            road_types.extend(['Urban Arterial', 'Collector Road', 'Local Street'])
        if 'highway' in desc_lower or 'expressway' in desc_lower or 'rural' in desc_lower:
            road_types.extend(['Highway', 'Expressway', 'Rural Road'])
        if 'residential' in desc_lower:
            road_types.append('Residential Street')
        if 'school' in desc_lower:
            road_types.extend(['School Zone', 'Urban Arterial', 'Collector Road'])
    
    # Default based on category
    if not road_types:
        if isinstance(category, str):
            if 'Road Sign' in category:
                road_types = ['All Road Types']
            elif 'Road Marking' in category:
                road_types = ['All Road Types']
            elif 'Traffic Calming' in category:
                road_types = ['Local Street', 'Collector Road', 'Residential Area']
    
    return list(set(road_types)) if road_types else ['General']

def infer_environments(description, category):
    """Infer suitable environments"""
    environments = []
    
    if isinstance(description, str):
        desc_lower = description.lower()
        
        if 'school' in desc_lower:
            environments.append('Near Schools')
        if 'hospital' in desc_lower:
            environments.append('Near Hospitals')
        if 'residential' in desc_lower:
            environments.append('Residential Area')
        if 'commercial' in desc_lower:
            environments.append('Commercial Area')
        if 'pedestrian' in desc_lower:
            environments.append('High Pedestrian Activity')
        if 'intersection' in desc_lower or 'crossing' in desc_lower:
            environments.append('Intersections')
    
    if not environments:
        environments = ['General']
    
    return list(set(environments))

if __name__ == "__main__":
    process_database()