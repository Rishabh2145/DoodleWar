import json
import torch
from PIL import Image
from io import BytesIO
from .model_loader import model, transform

# Load label map
with open("app/label_map.json") as f:
    label_map = json.load(f)

def predict_image(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)

    class_index = str(predicted.item())
    label = label_map[class_index]

    return {
        "class_index": class_index,
        "label": label
    }