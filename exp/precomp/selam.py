#!/usr/bin/env python
# coding: utf-8

# In[1]:


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


# In[2]:


img = cv2.imread('letters.jpg')

# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# In[3]:


# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,5)

denoised = cv2.medianBlur(gray,5)


# In[4]:


#thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

thresholded = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]


# In[5]:


#dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)

kernel = np.ones((5,5),np.uint8)
dilated = cv2.dilate(thresholded, kernel, iterations = 1)


# In[6]:


#erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)

eroded = cv2.erode(dilated, kernel, iterations = 1)


# In[7]:


#opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)

opened = cv2.morphologyEx(eroded, cv2.MORPH_OPEN, kernel)


# In[8]:


#canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)

canny_edged = cv2.Canny(opened, 100, 200)


# In[9]:


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

coords = np.column_stack(np.where(canny_edged > 0))
angle = cv2.minAreaRect(coords)[-1]
if angle < -45:
    angle = -(90 + angle)
else:
    angle = -angle
(h, w) = canny_edged.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, angle, 1.0)
rotated = cv2.warpAffine(canny_edged, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)


# In[ ]:


cv2.imshow("Orijinal Image", img)
cv2.imshow("Gray", gray)
cv2.imshow("Denoised", denoised)
cv2.imshow("Thresholded", thresholded)
cv2.imshow("Opened", opened)
cv2.imshow("Rotated", rotated)

cv2.waitKey(0)
cv2.destroyAllWindows()


# In[ ]:





# In[ ]:


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


# In[ ]:





# In[ ]:





# In[ ]:




