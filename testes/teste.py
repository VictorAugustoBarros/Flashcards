from PIL import Image
import sys

import pyocr.builders

tools = pyocr.get_available_tools()
if len(tools) == 0:
    print("No OCR tool found")
    sys.exit(1)
tool = tools[1]

txt = tool.image_to_string(
    Image.open('testes/teste_full.jpg'),
    lang="jpn",
    builder=pyocr.builders.TextBuilder()
)
text = txt.split("\n")
for idx, str in enumerate(text):
    if idx+1 < len(text):
        has_separator = True if len(text[idx+1].split("-")) > 1 else False
        if not has_separator:
            text[idx] = text[idx] + " " + text[idx+1]
            del text[idx+1]
    else:
        break
print(text)
