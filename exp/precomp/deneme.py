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

def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def remove_noise(image):
    return cv2.medianBlur(image,5)

################################################################
# Karsilastirmak icin hazir kod
# 
img = data.page()
img_cv = cv2.imread('img.jpg')
# Here, we specify a radius for local thresholding algorithms.
# If it is not specified, only global algorithms are called.
fig, ax = try_all_threshold(img, figsize=(10, 8), verbose=False)
plt.show()
################################################################
print("amk")

# #Input

img_orig = Image.open("img.png")
arr_orig = asarray(img_orig) 
gray_sci = np.mean(arr_orig, axis=2) # Scikit grayscale aslinda degil 
gray_cv = get_grayscale(img_orig) # opencv grayscale
# Rescaling

### Calculate 7 different Thresholds ###
# Scikit'ten cikan grayscale
thresh_iso = threshold_isodata(gray_sci)
thresh_otsu = threshold_otsu(gray_sci)
thresh_li = threshold_li(gray_sci)
thresh_mean = threshold_mean(gray_sci)
thresh_min = threshold_minimum(gray_sci)
thresh_yen = threshold_yen(gray_sci)
#Opencv'den cikan grayscale
thresh_iso_cv = threshold_isodata(gray_cv)
thresh_otsu_cv = threshold_otsu(gray_cv)
thresh_li_cv = threshold_li(gray_cv)
thresh_mean_cv = threshold_mean(gray_cv)
thresh_min_cv = threshold_minimum(gray_cv)
thresh_yen_cv = threshold_yen(gray_cv)

### Binarisation ###
# Scikit'ten cikan grayscale
binary_iso = gray_sci > thresh_iso
binary_otsu = gray_sci > thresh_otsu
binary_li = gray_sci > thresh_li
binary_mean = gray_sci > thresh_mean
binary_min = gray_sci > thresh_min
binary_yen = gray_sci > thresh_yen
#Opencv'den cikan grayscale
binary_iso = gray_cv > thresh_iso
binary_otsu = gray_cv > thresh_otsu
binary_li = gray_cv > thresh_li
binary_mean = gray_cv > thresh_mean
binary_min = gray_cv > thresh_min
binary_yen = gray_cv > thresh_yen

# Converting to image
iso_array = binary_iso.astype('uint8')*255
im = Image.fromarray(iso_array)
im.save('iso.png')
plt.figure()
im.show()

otsu_array = binary_otsu.astype('uint8')*255
im = Image.fromarray(otsu_array)
im.save('otsu.png')
plt.figure()
im.show()

li_array = binary_li.astype('uint8')*255
im = Image.fromarray(li_array)
im.save('li.png')
plt.figure()
im.show()

mean_array = binary_mean.astype('uint8')*255
im = Image.fromarray(mean_array)
im.save('mean.png')
plt.figure()
im.show()

min_array = binary_min.astype('uint8')*255
im = Image.fromarray(min_array)
im.save('min.png')
plt.figure()
im.show()

yen_array = binary_yen.astype('uint8')*255
im = Image.fromarray(yen_array)
im.save('yen.png')
plt.figure()
im.show()


    