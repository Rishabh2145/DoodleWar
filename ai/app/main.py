from fastapi import FastAPI
from app.services.inference import predict

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI running"}

@app.get("/predict")
def get_prediction():
    import torch
    dummy = torch.randn(1, 3, 224, 224)
    result = predict(dummy)
    return {"prediction": int(result)}