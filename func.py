import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_DIR = os.path.join(BASE_DIR, "static/public")

def getUrl():
    data = []
    list = os.listdir(FILE_DIR)
    for i in list:
        fileurl = os.path.join(FILE_DIR, i)
        if (os.path.isdir(fileurl)):
            data.append({"url": fileurl, "name": i, "type": "folder", "size": "-"})
        else:
            size = os.path.getsize(fileurl)
            data.append({"url": fileurl, "name": i, "type": "file", "size": size})
    return data

def subUrl(url):
    data = []
    if os.path.isdir(url):
        list = os.listdir(url)
        data.append({"type": "folder"})
        for i in list:
            fileurl = os.path.join(url, i)
            if (os.path.isdir(fileurl)):
                data.append({"url": fileurl, "name": i, "type": "folder", "size": "-"})
            else:
                size = os.path.getsize(fileurl)
                data.append({"url": fileurl, "name": i, "type": "file", "size": size})
    else:
        url = url.replace(FILE_DIR, "")[1:]
        DOWN_LOAD = os.path.join("http://121.36.5.83:4000", url)
        print("download",DOWN_LOAD)
        data.append({"type": "file"})
        data.append({"url": DOWN_LOAD})

    return data