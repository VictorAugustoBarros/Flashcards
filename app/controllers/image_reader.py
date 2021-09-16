"""Image Reader."""
from PIL import Image
import pyocr.builders


class ImageReader:
    """Classe para processamento de texto em imagem."""

    def __init__(self, url_image: str):
        """Construtor da classe."""
        self.url_image = url_image
        self.tools = self.get_tools()

    @staticmethod
    def get_tools():
        """Busca as ferramentas disponíveis para processamento da imagens."""
        tools = pyocr.get_available_tools()
        if len(tools) == 0:
            print("No OCR tool found")
            return {}
        return tools

    def read_image(self) -> str:
        """Processa a imagem retornado o texto encontrado na imagem."""
        tool = self.tools[1]
        text = tool.image_to_string(Image.open(self.url_image), lang="jpn", builder=pyocr.builders.TextBuilder())
        return text

    def read_text(self, text: str):
        """Processa o texto retornado construindo lista com as palavras e traduções.

        Args:
            text ():
        """
        list_words = text.split("\n")
        for idx, str in enumerate(list_words):
            next_idx = idx + 1
            if next_idx < len(list_words):
                has_separator = True if len(list_words[next_idx].split("-")) > 1 else False
                if not has_separator:
                    list_words[idx] = list_words[idx] + " " + list_words[next_idx]
                    del list_words[next_idx]
            else:
                break

        words = []
        words_error = []
        for word in list_words:
            word_splitted = word.split("-")
            if len(word_splitted) < 3:
                words_error.append(word)
                continue

            words.append(
                {
                    "pt": word_splitted[2].lower().strip(),
                    "jp": word_splitted[0].lower().strip(),
                    "jp_write": word_splitted[1].lower().strip(),
                }
            )

        print(words_error)
        return words


if __name__ == "__main__":
    image_reder = ImageReader(url_image="../images/teste.jpeg")
    text = image_reder.read_image()
    words, words_error = image_reder.read_text(text=text)
    print(words)
