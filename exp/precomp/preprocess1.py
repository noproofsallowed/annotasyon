# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'

# %%
import matplotlib.pyplot as plt
from skimage import data
from skimage.filters import try_all_threshold
from skimage.filters import threshold_otsu
from skimage.filters import threshold_isodata
from skimage.filters import threshold_li
from skimage.filters import threshold_local
from skimage.filters import threshold_mean
from skimage.filters import threshold_minimum
from skimage.filters import threshold_yen
from PIL import Image
import numpy as np
from numpy import asarray
import cv2


# %%
#img = cv2.imread('letters.jpg')
img = cv2.imread('test.png')

# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# %%
# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,3)

denoised = cv2.medianBlur(gray,5)


# # %%
# #thresholding
# def thresholding(image):
#     return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

# thresholded = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]


# %%
#skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated

coords = np.column_stack(np.where(thresholded > 0))
angle = cv2.minAreaRect(coords)[-1]
if angle < -45:
    angle = -(90 + angle)
else:
    angle = -angle
(h, w) = thresholded.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, angle, 1.0)
rotated = cv2.warpAffine(thresholded, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)


# %%
cv2.imshow("Orijinal Image", img)
cv2.imshow("Gray", gray)
cv2.imshow("Denoised", denoised)
cv2.imshow("Thresholded", thresholded)
cv2.imshow("Rotated", rotated)

cv2.waitKey(0)
cv2.destroyAllWindows()


# %%
# Test cv2

import cv2

print("OpenCV version:")
print(cv2.__version__)

img = cv2.imread("clouds.jpg")

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cv2.imshow("Over the Clouds", img)
cv2.imshow("Over the Clouds - gray", gray)

cv2.waitKey(0)
cv2.destroyAllWindows()

