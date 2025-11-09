import pandas as pd
import json
import chardet

def detect_encoding(file_path):
    """Detect the encoding of the CSV file"""
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        return result['encoding']

def process_database():
    csv_file_path = 'data/raw_database/GPT_Input_DB(Sheet1).csv'
    
    try:
        encoding = detect_encoding(csv_file_path)
        print(f"Detected encoding: {encoding}")
        df = pd.read_csv(csv_file_path, encoding=encoding)
        
    except UnicodeDecodeError:
        print("Detected encoding failed, trying common encodings...")
        encodings = ['latin1', 'iso-8859-1', 'cp1252', 'utf-16']
        
        for enc in encodings:
            try:
                df = pd.read_csv(csv_file_path, encoding=enc)
                print(f"Success with encoding: {enc}")
                break
            except UnicodeDecodeError:
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
            "description": row['data'],
            "standard_code": row['code'],
            "clause": row['clause'],
            "keywords": extract_keywords(row['problem'], row['type'], row['data']),
            "road_types": infer_road_types(row['data'], row['category']),
            "environments": infer_environments(row['data'], row['category'])
        }
        processed_data.append(intervention)
    with open('data/processed_database.json', 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, indent=2)
    
    print(f"Processed {len(processed_data)} interventions")
    print("Sample of first intervention:")
    print(json.dumps(processed_data[0], indent=2))
    return processed_data

def extract_keywords(problem, intervention_type, description):
    """Extract relevant keywords for better matching"""
    keywords = []
    if isinstance(problem, str):
        keywords.extend(problem.lower().split())
    if isinstance(intervention_type, str):
        keywords.extend(intervention_type.lower().split())
    common_terms = ['speed', 'pedestrian', 'crossing', 'school', 'hospital', 'stop', 
                   'warning', 'mandatory', 'informatory', 'prohibitory', 'urban', 
                   'rural', 'highway', 'expressway', 'residential', 'commercial',
                   'damaged', 'missing', 'faded', 'placement', 'spacing', 'height',
                   'visibility', 'obstruction', 'non-standard', 'wrong colour']
    
    if isinstance(description, str):
        description_lower = description.lower()
        for term in common_terms:
            if term in description_lower:
                keywords.append(term)
    
    return list(set(keywords)) 

def infer_road_types(description, category):
    """Infer suitable road types from description"""
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
    """Infer suitable environments from description"""
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