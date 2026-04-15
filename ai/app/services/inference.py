import torch

MODEL_PATH = "models/model.pth"

model = torch.load(MODEL_PATH, map_location=torch.device("cpu"))
model.eval()

def predict(input_tensor):
    with torch.no_grad():
        output = model(input_tensor)
        predicted = torch.argmax(output, dim=1)
    return predicted.item()