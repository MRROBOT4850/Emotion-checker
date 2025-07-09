from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()


class TextRequest(BaseModel):
    text: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"], 
    allow_headers=["*"],  
)


emotion_keywords = {
    "anxiety": ["anxious", "nervous", "worried"],
    "depression": ["depressed", "sad"],
    "joy": ["happy", "joyful", "excited"],
    "anger": ["angry", "furious", "mad","hyper","fucked up"],
}


emotion_confidence = {
    "anxiety": 0.85,
    "depression": 0.8,
    "joy": 0.9,
    "anger": 0.75,
}

@app.post("/detect-emotion")
async def detect_emotion(request: TextRequest):
    
    text = request.text.lower()
  
    for emotion, keywords in emotion_keywords.items():
        if any(keyword in text for keyword in keywords):
            return {"emotion": emotion, "confidence": emotion_confidence[emotion]}
   
    return {"emotion": "Sorry we didn't anything that matches condition", "confidence": 0.0}
