from PIL import Image
import numpy as np
from numpy import asarray
import cv2

def testcv2():
    img = cv2.imread('erzurumkesit.png', 0)
    denoised = cv2.medianBlur(img,3)
    th = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, \
        cv2.THRESH_BINARY, 11, 7)
    cv2.imwrite('test_erzurum2.png', th)

if __name__ == '__main__':
    testcv2()
