from PIL import Image

def is_image(file_path):
    try:
        Image.open(file_path)
        return True
    except IOError:
        return False