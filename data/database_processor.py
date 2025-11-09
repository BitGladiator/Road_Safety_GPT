import pandas as pd
import json

def process_database():
    df = pd.read_csv('data/raw_database/GPT_Input_DB(Sheet1).csv')
    
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
    
    with open('data/processed_database.json', 'w') as f:
        json.dump(processed_data, f, indent=2)
    
    print(f"Processed {len(processed_data)} interventions")
    return processed_data

def extract_keywords(problem, intervention_type, description):
    """Extract relevant keywords for better matching"""
    keywords = []
    keywords.extend(problem.lower().split())
    keywords.extend(intervention_type.lower().split())
    common_terms = ['speed', 'pedestrian', 'crossing', 'school', 'hospital', 'stop', 
                   'warning', 'mandatory', 'informatory', 'prohibitory', 'urban', 
                   'rural', 'highway', 'expressway', 'residential', 'commercial']
    
    description_lower = description.lower()
    for term in common_terms:
        if term in description_lower:
            keywords.append(term)
    
    return list(set(keywords))

def infer_road_types(description, category):
    """Infer suitable road types from description"""
    road_types = []
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
        if 'Road Sign' in category:
            road_types = ['All Road Types']
        elif 'Road Marking' in category:
            road_types = ['All Road Types']
        elif 'Traffic Calming' in category:
            road_types = ['Local Street', 'Collector Road', 'Residential Area']
    
    return list(set(road_types))

def infer_environments(description, category):
    """Infer suitable environments from description"""
    environments = []
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