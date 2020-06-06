import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocrComponent } from './hocr.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HocrComponent', () => {
  let component: HocrComponent;
  let fixture: ComponentFixture<HocrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HocrComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.hocr = testHocrStr;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hocrStr).toBe(testHocrStr);
  });

  it('should parse testHocrStr root', () => {
    expect(component.root[0].id).toBe('page_1');
    expect(component.root[0].typeset).toBe('ocr_page');
    expect(component.root[0].bbox).toEqual({
      x: 0,
      y: 0,
      width: 2578,
      height: 490,
      text: ''
    });
  });

  it('should parse leaf content', () => {
    expect(
      component.root[0].children[0].children[0].children[0].children[0].bbox
        .text
    ).toEqual('سیاست‌ها');
  });

  it('should flatten tree for rect array', () => {
    expect(component.rects.length).toEqual(269);
  });

  const testHocrStr = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
  <meta name='ocr-system' content='tesseract 4.1.1' />
  <meta name='ocr-capabilities' content='ocr_page ocr_carea ocr_par ocr_line ocrx_word ocrp_wconf'/>
 </head>
 <body>
  <div class='ocr_page' id='page_1' title='image "wiki_farsi_1.png"; bbox 0 0 2578 490; ppageno 0'>
   <div class='ocr_carea' id='block_1_1' title="bbox 2401 35 2538 61">
    <p class='ocr_par' dir='rtl' id='par_1_1' lang='fas' title="bbox 2401 35 2538 61">
     <span class='ocr_line' id='line_1_1' title="bbox 2401 35 2538 61; baseline 0 0; x_size 26.571428; x_descenders 5.5714288; x_ascenders 8">
      <span class='ocrx_word' id='word_1_1' title='bbox 2401 35 2538 61; x_wconf 81'>سیاست‌ها</span>
     </span>
    </p>
   </div>
   <div class='ocr_carea' id='block_1_2' title="bbox 27 97 2538 216">
    <p class='ocr_par' dir='rtl' id='par_1_2' lang='fas' title="bbox 27 97 2538 216">
     <span class='ocr_line' id='line_1_2' title="bbox 129 97 2538 130; baseline 0 -8; x_size 31; x_descenders 6; x_ascenders 11">
      <span class='ocrx_word' id='word_1_2' title='bbox 2446 101 2538 130; x_wconf 85'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_3' title='bbox 2410 93 2439 134; x_wconf 91'>از</span>
      <span class='ocrx_word' id='word_1_4' title='bbox 2371 101 2436 130; x_wconf 90'>تمام</span>
      <span class='ocrx_word' id='word_1_5' title='bbox 2247 97 2362 128; x_wconf 87'>ویرایشگران</span>
      <span class='ocrx_word' id='word_1_6' title='bbox 2195 106 2238 128; x_wconf 92'>خود</span>
      <span class='ocrx_word' id='word_1_7' title='bbox 2083 101 2187 128; x_wconf 92'>می‌خواهد</span>
      <span class='ocrx_word' id='word_1_8' title='bbox 2062 101 2075 122; x_wconf 93'>تا</span>
      <span class='ocrx_word' id='word_1_9' title='bbox 1994 97 2052 130; x_wconf 91'>هنگام</span>
      <span class='ocrx_word' id='word_1_10' title='bbox 1919 104 1985 128; x_wconf 91'>نوشتن</span>
      <span class='ocrx_word' id='word_1_11' title='bbox 1823 98 1909 128; x_wconf 89'>«دیدگاه</span>
      <span class='ocrx_word' id='word_1_12' title='bbox 1698 101 1814 128; x_wconf 91'>بی‌طرفانه»</span>
      <span class='ocrx_word' id='word_1_13' title='bbox 1664 101 1688 128; x_wconf 89'>ای</span>
      <span class='ocrx_word' id='word_1_14' title='bbox 1593 101 1654 122; x_wconf 93'>داشته</span>
      <span class='ocrx_word' id='word_1_15' title='bbox 1526 101 1585 128; x_wconf 91'>باشند</span>
      <span class='ocrx_word' id='word_1_16' title='bbox 1495 93 1516 134; x_wconf 93'>و</span>
      <span class='ocrx_word' id='word_1_17' title='bbox 1423 104 1517 130; x_wconf 92'>پژوهش</span>
      <span class='ocrx_word' id='word_1_18' title='bbox 1339 101 1413 128; x_wconf 90'>ابتکاری</span>
      <span class='ocrx_word' id='word_1_19' title='bbox 1288 106 1330 128; x_wconf 92'>خود</span>
      <span class='ocrx_word' id='word_1_20' title='bbox 1266 101 1279 127; x_wconf 92'>را</span>
      <span class='ocrx_word' id='word_1_21' title='bbox 1231 108 1253 128; x_wconf 96'>در</span>
      <span class='ocrx_word' id='word_1_22' title='bbox 1126 93 1222 134; x_wconf 86'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_23' title='bbox 1085 93 1123 134; x_wconf 92'>قرار</span>
      <span class='ocrx_word' id='word_1_24' title='bbox 1008 93 1075 134; x_wconf 92'>ندهند.</span>
      <span class='ocrx_word' id='word_1_25' title='bbox 960 97 999 122; x_wconf 92'>نگاه</span>
      <span class='ocrx_word' id='word_1_26' title='bbox 853 101 951 128; x_wconf 89'>بی‌طرفانه</span>
      <span class='ocrx_word' id='word_1_27' title='bbox 821 101 845 122; x_wconf 82'>که</span>
      <span class='ocrx_word' id='word_1_28' title='bbox 770 106 812 128; x_wconf 92'>خود</span>
      <span class='ocrx_word' id='word_1_29' title='bbox 676 101 760 128; x_wconf 90'>سیاستی</span>
      <span class='ocrx_word' id='word_1_30' title='bbox 569 101 666 128; x_wconf 87'>«غیرقابل</span>
      <span class='ocrx_word' id='word_1_31' title='bbox 458 101 560 128; x_wconf 90'>بازگشت»</span>
      <span class='ocrx_word' id='word_1_32' title='bbox 399 101 448 122; x_wconf 91'>است</span>
      <span class='ocrx_word' id='word_1_33' title='bbox 334 102 390 122; x_wconf 91'>هدف</span>
      <span class='ocrx_word' id='word_1_34' title='bbox 231 101 325 122; x_wconf 93'>دانشنامه</span>
      <span class='ocrx_word' id='word_1_35' title='bbox 210 101 223 127; x_wconf 93'>را</span>
      <span class='ocrx_word' id='word_1_36' title='bbox 129 98 200 128; x_wconf 78'>اینگونه</span>
     </span>
     <span class='ocr_line' id='line_1_3' title="bbox 27 141 2538 175; baseline 0 -9; x_size 30; x_descenders 6; x_ascenders 10">
      <span class='ocrx_word' id='word_1_37' title='bbox 2420 148 2538 172; x_wconf 90'>برمی‌شمرد:</span>
      <span class='ocrx_word' id='word_1_38' title='bbox 2339 145 2409 172; x_wconf 92'>«نشان</span>
      <span class='ocrx_word' id='word_1_39' title='bbox 2281 145 2330 172; x_wconf 93'>دادن</span>
      <span class='ocrx_word' id='word_1_40' title='bbox 2207 145 2273 172; x_wconf 91'>عوامل</span>
      <span class='ocrx_word' id='word_1_41' title='bbox 2112 137 2197 179; x_wconf 37'>اختلاف</span>
      <span class='ocrx_word' id='word_1_42' title='bbox 2025 137 2102 179; x_wconf 82'>توصیف</span>
      <span class='ocrx_word' id='word_1_43' title='bbox 1958 137 2018 179; x_wconf 92'>آن‌ها</span>
      <span class='ocrx_word' id='word_1_44' title='bbox 1942 152 1961 172; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_45' title='bbox 1889 145 1934 172; x_wconf 88'>جای</span>
      <span class='ocrx_word' id='word_1_46' title='bbox 1840 145 1880 172; x_wconf 93'>وارد</span>
      <span class='ocrx_word' id='word_1_47' title='bbox 1781 148 1830 172; x_wconf 91'>شدن</span>
      <span class='ocrx_word' id='word_1_48' title='bbox 1745 137 1777 179; x_wconf 93'>در</span>
      <span class='ocrx_word' id='word_1_49' title='bbox 1682 142 1771 172; x_wconf 91'>آنها».</span>
      <span class='ocrx_word' id='word_1_50' title='bbox 1636 141 1672 172; x_wconf 57'>اگر</span>
      <span class='ocrx_word' id='word_1_51' title='bbox 1608 137 1637 179; x_wconf 57'>به</span>
      <span class='ocrx_word' id='word_1_52' title='bbox 1578 145 1608 172; x_wconf 38'>این</span>
      <span class='ocrx_word' id='word_1_53' title='bbox 1528 154 1570 175; x_wconf 95'>مهم</span>
      <span class='ocrx_word' id='word_1_54' title='bbox 1457 154 1519 175; x_wconf 73'>برسیم</span>
      <span class='ocrx_word' id='word_1_55' title='bbox 1398 137 1448 179; x_wconf 75'>دیگر</span>
      <span class='ocrx_word' id='word_1_56' title='bbox 1293 137 1395 179; x_wconf 79'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_57' title='bbox 1257 145 1295 172; x_wconf 92'>تنها</span>
      <span class='ocrx_word' id='word_1_58' title='bbox 1220 137 1247 179; x_wconf 92'>از</span>
      <span class='ocrx_word' id='word_1_59' title='bbox 1188 137 1220 179; x_wconf 86'>یک</span>
      <span class='ocrx_word' id='word_1_60' title='bbox 1097 142 1183 172; x_wconf 89'>«دیدگاه</span>
      <span class='ocrx_word' id='word_1_61' title='bbox 972 145 1088 172; x_wconf 90'>بی‌طرفانه»</span>
      <span class='ocrx_word' id='word_1_62' title='bbox 923 145 963 172; x_wconf 87'>بیان</span>
      <span class='ocrx_word' id='word_1_63' title='bbox 804 145 914 166; x_wconf 92'>نشده‌است</span>
      <span class='ocrx_word' id='word_1_64' title='bbox 753 145 795 172; x_wconf 72'>بلکه</span>
      <span class='ocrx_word' id='word_1_65' title='bbox 687 145 745 172; x_wconf 89'>حاوی</span>
      <span class='ocrx_word' id='word_1_66' title='bbox 607 144 678 172; x_wconf 89'>تمامی</span>
      <span class='ocrx_word' id='word_1_67' title='bbox 530 145 598 171; x_wconf 91'>نظرات</span>
      <span class='ocrx_word' id='word_1_68' title='bbox 423 145 521 172; x_wconf 87'>بی‌طرفانه</span>
      <span class='ocrx_word' id='word_1_69' title='bbox 349 145 415 172; x_wconf 91'>مربوط</span>
      <span class='ocrx_word' id='word_1_70' title='bbox 321 152 340 172; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_71' title='bbox 282 145 313 172; x_wconf 87'>یک</span>
      <span class='ocrx_word' id='word_1_72' title='bbox 193 149 273 174; x_wconf 92'>موضوع</span>
      <span class='ocrx_word' id='word_1_73' title='bbox 116 145 185 172; x_wconf 90'>خواهد</span>
      <span class='ocrx_word' id='word_1_74' title='bbox 67 152 107 172; x_wconf 92'>بود.</span>
      <span class='ocrx_word' id='word_1_75' title='bbox 27 145 57 172; x_wconf 81'>اين</span>
     </span>
     <span class='ocr_line' id='line_1_4' title="bbox 131 186 2538 216; baseline 0 -6; x_size 30; x_descenders 6; x_ascenders 10">
      <span class='ocrx_word' id='word_1_76' title='bbox 2458 189 2538 216; x_wconf 72'>سیاست</span>
      <span class='ocrx_word' id='word_1_77' title='bbox 2409 189 2449 216; x_wconf 90'>بیان</span>
      <span class='ocrx_word' id='word_1_78' title='bbox 2324 189 2400 216; x_wconf 90'>می‌دارد</span>
      <span class='ocrx_word' id='word_1_79' title='bbox 2291 189 2316 210; x_wconf 93'>که</span>
      <span class='ocrx_word' id='word_1_80' title='bbox 2263 196 2283 216; x_wconf 93'>به</span>
      <span class='ocrx_word' id='word_1_81' title='bbox 2220 182 2249 220; x_wconf 93'>هر</span>
      <span class='ocrx_word' id='word_1_82' title='bbox 2130 186 2255 216; x_wconf 90'>دیدگاهی</span>
      <span class='ocrx_word' id='word_1_83' title='bbox 2070 195 2121 216; x_wconf 90'>بسته</span>
      <span class='ocrx_word' id='word_1_84' title='bbox 2042 196 2062 216; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_85' title='bbox 1949 189 2033 216; x_wconf 92'>اعتبارش</span>
      <span class='ocrx_word' id='word_1_86' title='bbox 1902 189 1940 216; x_wconf 73'>باید</span>
      <span class='ocrx_word' id='word_1_87' title='bbox 1868 189 1893 216; x_wconf 93'>بها</span>
      <span class='ocrx_word' id='word_1_88' title='bbox 1819 189 1858 210; x_wconf 91'>داد.</span>
      <span class='ocrx_word' id='word_1_89' title='bbox 1783 189 1808 216; x_wconf 88'>از</span>
      <span class='ocrx_word' id='word_1_90' title='bbox 1741 182 1780 220; x_wconf 52'>این</span>
      <span class='ocrx_word' id='word_1_91' title='bbox 1667 189 1747 216; x_wconf 58'>سیاست</span>
      <span class='ocrx_word' id='word_1_92' title='bbox 1638 196 1658 216; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_93' title='bbox 1567 182 1628 220; x_wconf 92'>خاطر</span>
      <span class='ocrx_word' id='word_1_94' title='bbox 1491 182 1568 220; x_wconf 91'>داشتن</span>
      <span class='ocrx_word' id='word_1_95' title='bbox 1431 190 1493 216; x_wconf 89'>هدفی</span>
      <span class='ocrx_word' id='word_1_96' title='bbox 1342 189 1422 216; x_wconf 82'>غیرقابل</span>
      <span class='ocrx_word' id='word_1_97' title='bbox 1254 195 1333 216; x_wconf 92'>دسترس</span>
      <span class='ocrx_word' id='word_1_98' title='bbox 1221 189 1246 210; x_wconf 92'>که</span>
      <span class='ocrx_word' id='word_1_99' title='bbox 1188 196 1213 215; x_wconf 96'>در</span>
      <span class='ocrx_word' id='word_1_100' title='bbox 1136 182 1182 220; x_wconf 93'>مورد</span>
      <span class='ocrx_word' id='word_1_101' title='bbox 1086 182 1129 220; x_wconf 90'>آثار</span>
      <span class='ocrx_word' id='word_1_102' title='bbox 988 182 1087 220; x_wconf 79'>بی‌اعتبار</span>
      <span class='ocrx_word' id='word_1_103' title='bbox 905 182 989 220; x_wconf 90'>بی‌مورد</span>
      <span class='ocrx_word' id='word_1_104' title='bbox 859 189 908 210; x_wconf 92'>است</span>
      <span class='ocrx_word' id='word_1_105' title='bbox 833 182 859 220; x_wconf 93'>و</span>
      <span class='ocrx_word' id='word_1_106' title='bbox 812 196 850 216; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_107' title='bbox 690 186 804 216; x_wconf 90'>دیدگاه‌های</span>
      <span class='ocrx_word' id='word_1_108' title='bbox 625 193 680 210; x_wconf 92'>«ضد</span>
      <span class='ocrx_word' id='word_1_109' title='bbox 525 189 615 216; x_wconf 90'>اخلاقی»</span>
      <span class='ocrx_word' id='word_1_110' title='bbox 463 188 515 216; x_wconf 45'>اجازهُ</span>
      <span class='ocrx_word' id='word_1_111' title='bbox 398 182 444 220; x_wconf 92'>ظهور</span>
      <span class='ocrx_word' id='word_1_112' title='bbox 313 182 390 220; x_wconf 91'>می‌دهد</span>
      <span class='ocrx_word' id='word_1_113' title='bbox 247 189 305 210; x_wconf 92'>انتقاد</span>
      <span class='ocrx_word' id='word_1_114' title='bbox 131 189 238 210; x_wconf 92'>شده‌است.</span>
     </span>
    </p>
   </div>
   <div class='ocr_carea' id='block_1_3' title="bbox 53 243 2539 466">
    <p class='ocr_par' dir='rtl' id='par_1_3' lang='fas' title="bbox 82 243 2538 320">
     <span class='ocr_line' id='line_1_5' title="bbox 82 243 2538 276; baseline 0 -8; x_size 30.163759; x_descenders 6.1637588; x_ascenders 8">
      <span class='ocrx_word' id='word_1_115' title='bbox 2518 247 2538 274; x_wconf 90'>آرا</span>
      <span class='ocrx_word' id='word_1_116' title='bbox 2486 239 2508 280; x_wconf 93'>و</span>
      <span class='ocrx_word' id='word_1_117' title='bbox 2418 247 2509 274; x_wconf 90'>نظراتی</span>
      <span class='ocrx_word' id='word_1_118' title='bbox 2386 247 2410 268; x_wconf 90'>که</span>
      <span class='ocrx_word' id='word_1_119' title='bbox 2365 247 2378 268; x_wconf 96'>تا</span>
      <span class='ocrx_word' id='word_1_120' title='bbox 2310 250 2355 276; x_wconf 87'>پیش</span>
      <span class='ocrx_word' id='word_1_121' title='bbox 2274 239 2306 280; x_wconf 96'>از</span>
      <span class='ocrx_word' id='word_1_122' title='bbox 2216 247 2300 274; x_wconf 93'>نوشته</span>
      <span class='ocrx_word' id='word_1_123' title='bbox 2158 250 2207 274; x_wconf 89'>شدن</span>
      <span class='ocrx_word' id='word_1_124' title='bbox 2121 239 2152 280; x_wconf 93'>در</span>
      <span class='ocrx_word' id='word_1_125' title='bbox 2027 247 2148 276; x_wconf 84'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_126' title='bbox 1943 239 2012 280; x_wconf 89'>منتشر</span>
      <span class='ocrx_word' id='word_1_127' title='bbox 1889 239 1944 280; x_wconf 89'>نشده</span>
      <span class='ocrx_word' id='word_1_128' title='bbox 1812 247 1880 274; x_wconf 33'>باشند»</span>
      <span class='ocrx_word' id='word_1_129' title='bbox 1671 247 1803 274; x_wconf 89'>«تحقیق‌های</span>
      <span class='ocrx_word' id='word_1_130' title='bbox 1569 247 1661 274; x_wconf 89'>ابتکاری»</span>
      <span class='ocrx_word' id='word_1_131' title='bbox 1511 247 1561 274; x_wconf 89'>تلقی</span>
      <span class='ocrx_word' id='word_1_132' title='bbox 1413 250 1502 274; x_wconf 90'>می‌شوند</span>
      <span class='ocrx_word' id='word_1_133' title='bbox 1386 239 1408 280; x_wconf 93'>و</span>
      <span class='ocrx_word' id='word_1_134' title='bbox 1333 246 1405 274; x_wconf 36'>اجازةٌ</span>
      <span class='ocrx_word' id='word_1_135' title='bbox 1279 254 1324 274; x_wconf 93'>ورود</span>
      <span class='ocrx_word' id='word_1_136' title='bbox 1183 247 1270 274; x_wconf 92'>نخواهند</span>
      <span class='ocrx_word' id='word_1_137' title='bbox 1102 247 1174 268; x_wconf 91'>داشت.</span>
      <span class='ocrx_word' id='word_1_138' title='bbox 1013 247 1092 274; x_wconf 76'>سیاست</span>
      <span class='ocrx_word' id='word_1_139' title='bbox 917 250 1003 274; x_wconf 83'>«تحقیق</span>
      <span class='ocrx_word' id='word_1_140' title='bbox 779 247 908 274; x_wconf 89'>غیرابتکاری»</span>
      <span class='ocrx_word' id='word_1_141' title='bbox 698 244 769 274; x_wconf 81'>اینگونه</span>
      <span class='ocrx_word' id='word_1_142' title='bbox 649 247 690 274; x_wconf 83'>بیان</span>
      <span class='ocrx_word' id='word_1_143' title='bbox 564 247 641 274; x_wconf 91'>می‌دارد</span>
      <span class='ocrx_word' id='word_1_144' title='bbox 525 239 557 280; x_wconf 92'>که</span>
      <span class='ocrx_word' id='word_1_145' title='bbox 484 239 523 280; x_wconf 92'>آثار</span>
      <span class='ocrx_word' id='word_1_146' title='bbox 385 244 556 276; x_wconf 83'>این‌چنینی</span>
      <span class='ocrx_word' id='word_1_147' title='bbox 270 247 376 274; x_wconf 85'>نمی‌توانند</span>
      <span class='ocrx_word' id='word_1_148' title='bbox 170 239 260 280; x_wconf 83'>نمایانگر</span>
      <span class='ocrx_word' id='word_1_149' title='bbox 71 239 171 280; x_wconf 91'>دیدگاهی</span>
     </span>
     <span class='ocr_line' id='line_1_6' title="bbox 1573 287 2538 320; baseline 0 -2; x_size 38.704697; x_descenders 7.7046986; x_ascenders 11">
      <span class='ocrx_word' id='word_1_150' title='bbox 2440 291 2538 318; x_wconf 91'>بی‌طرفانه</span>
      <span class='ocrx_word' id='word_1_151' title='bbox 2365 291 2432 318; x_wconf 92'>باشند.</span>
      <span class='ocrx_word' id='word_1_152' title='bbox 2320 301 2356 320; x_wconf 92'>پس</span>
      <span class='ocrx_word' id='word_1_153' title='bbox 2243 291 2311 318; x_wconf 93'>نظرات</span>
      <span class='ocrx_word' id='word_1_154' title='bbox 2221 291 2234 318; x_wconf 75'>یا</span>
      <span class='ocrx_word' id='word_1_155' title='bbox 2098 288 2212 318; x_wconf 89'>دیدگاه‌های</span>
      <span class='ocrx_word' id='word_1_156' title='bbox 2033 298 2090 318; x_wconf 75'>جدید</span>
      <span class='ocrx_word' id='word_1_157' title='bbox 1909 287 2024 318; x_wconf 86'>ویرایشگران</span>
      <span class='ocrx_word' id='word_1_158' title='bbox 1852 291 1900 318; x_wconf 72'>نباید</span>
      <span class='ocrx_word' id='word_1_159' title='bbox 1723 291 1843 320; x_wconf 75'>درویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_160' title='bbox 1644 292 1712 318; x_wconf 89'>معرفی</span>
      <span class='ocrx_word' id='word_1_161' title='bbox 1573 294 1635 318; x_wconf 93'>شوند.</span>
     </span>
    </p>

    <p class='ocr_par' dir='rtl' id='par_1_4' lang='fas' title="bbox 53 346 2539 466">
     <span class='ocr_line' id='line_1_7' title="bbox 53 346 2538 378; baseline 0 -8; x_size 28; x_descenders 6; x_ascenders 6">
      <span class='ocrx_word' id='word_1_162' title='bbox 2454 349 2538 376; x_wconf 88'>همکاران</span>
      <span class='ocrx_word' id='word_1_163' title='bbox 2354 349 2447 378; x_wconf 73'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_164' title='bbox 2312 342 2343 382; x_wconf 92'>از</span>
      <span class='ocrx_word' id='word_1_165' title='bbox 2217 349 2343 376; x_wconf 50'>سیاست‌ها</span>
      <span class='ocrx_word' id='word_1_166' title='bbox 2182 342 2203 382; x_wconf 93'>و</span>
      <span class='ocrx_word' id='word_1_167' title='bbox 2049 349 2208 376; x_wconf 89'>خط‌مشی‌های</span>
      <span class='ocrx_word' id='word_1_168' title='bbox 1978 355 2040 378; x_wconf 91'>متنوع</span>
      <span class='ocrx_word' id='word_1_169' title='bbox 1861 349 1970 378; x_wconf 88'>کوچک‌تری</span>
      <span class='ocrx_word' id='word_1_170' title='bbox 1812 342 1852 382; x_wconf 89'>نیز</span>
      <span class='ocrx_word' id='word_1_171' title='bbox 1712 342 1813 382; x_wconf 89'>پشتیبانی</span>
      <span class='ocrx_word' id='word_1_172' title='bbox 1627 349 1715 376; x_wconf 86'>می‌کنند.</span>
      <span class='ocrx_word' id='word_1_173' title='bbox 1585 342 1616 382; x_wconf 93'>بر</span>
      <span class='ocrx_word' id='word_1_174' title='bbox 1534 342 1586 382; x_wconf 93'>خلاف</span>
      <span class='ocrx_word' id='word_1_175' title='bbox 1469 342 1524 382; x_wconf 78'>دیگر</span>
      <span class='ocrx_word' id='word_1_176' title='bbox 1374 342 1470 382; x_wconf 89'>ویکی‌های</span>
      <span class='ocrx_word' id='word_1_177' title='bbox 1295 356 1365 376; x_wconf 92'>موجود</span>
      <span class='ocrx_word' id='word_1_178' title='bbox 1233 349 1286 370; x_wconf 91'>مانند</span>
      <span class='ocrx_word' id='word_1_179' title='bbox 1097 350 1225 377; x_wconf 56'>86۵0510۳۷</span>
      <span class='ocrx_word' id='word_1_180' title='bbox 1003 350 1088 371; x_wconf 70'>۲۵۲۲6۲۳</span>
      <span class='ocrx_word' id='word_1_181' title='bbox 896 349 994 371; x_wconf 64'>۳۵۲۲۱۵۳۵</span>
      <span class='ocrx_word' id='word_1_182' title='bbox 715 349 888 377; x_wconf 40'>0۳۳۳9۳۵۲۳5</span>
      <span class='ocrx_word' id='word_1_183' title='bbox 638 349 707 371; x_wconf 30'>۰/3۳۵</span>
      <span class='ocrx_word' id='word_1_184' title='bbox 538 349 630 378; x_wconf 76'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_185' title='bbox 508 356 527 376; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_186' title='bbox 455 349 500 376; x_wconf 86'>جای</span>
      <span class='ocrx_word' id='word_1_187' title='bbox 399 342 446 382; x_wconf 92'>قرار</span>
      <span class='ocrx_word' id='word_1_188' title='bbox 352 342 396 382; x_wconf 93'>دادن</span>
      <span class='ocrx_word' id='word_1_189' title='bbox 246 349 343 376; x_wconf 91'>بحث‌های</span>
      <span class='ocrx_word' id='word_1_190' title='bbox 171 349 238 376; x_wconf 90'>مربوط</span>
      <span class='ocrx_word' id='word_1_191' title='bbox 143 356 163 376; x_wconf 92'>به</span>
      <span class='ocrx_word' id='word_1_192' title='bbox 53 349 136 376; x_wconf 86'>تغییرات</span>
     </span>
     <span class='ocr_line' id='line_1_8' title="bbox 84 389 2539 422; baseline 0 -8; x_size 27; x_descenders 6; x_ascenders 7">
      <span class='ocrx_word' id='word_1_193' title='bbox 2460 393 2539 414; x_wconf 91'>مقاله‌ها</span>
      <span class='ocrx_word' id='word_1_194' title='bbox 2426 400 2448 420; x_wconf 93'>در</span>
      <span class='ocrx_word' id='word_1_195' title='bbox 2371 385 2417 426; x_wconf 96'>درون</span>
      <span class='ocrx_word' id='word_1_196' title='bbox 2320 390 2364 420; x_wconf 71'>آنهاء</span>
      <span class='ocrx_word' id='word_1_197' title='bbox 2221 393 2311 420; x_wconf 91'>صفحاتی</span>
      <span class='ocrx_word' id='word_1_198' title='bbox 2131 389 2212 420; x_wconf 92'>جداگانه</span>
      <span class='ocrx_word' id='word_1_199' title='bbox 2110 393 2123 419; x_wconf 93'>را</span>
      <span class='ocrx_word' id='word_1_200' title='bbox 2081 400 2100 420; x_wconf 93'>به</span>
      <span class='ocrx_word' id='word_1_201' title='bbox 2045 393 2072 422; x_wconf 93'>نام</span>
      <span class='ocrx_word' id='word_1_202' title='bbox 1949 396 2035 420; x_wconf 89'>«بحث»</span>
      <span class='ocrx_word' id='word_1_203' title='bbox 1920 400 1939 420; x_wconf 93'>به</span>
      <span class='ocrx_word' id='word_1_204' title='bbox 1880 393 1910 420; x_wconf 84'>اين</span>
      <span class='ocrx_word' id='word_1_205' title='bbox 1836 393 1871 420; x_wconf 90'>کار</span>
      <span class='ocrx_word' id='word_1_206' title='bbox 1740 385 1833 426; x_wconf 92'>اختصاص</span>
      <span class='ocrx_word' id='word_1_207' title='bbox 1625 393 1731 414; x_wconf 91'>داده‌است.</span>
      <span class='ocrx_word' id='word_1_208' title='bbox 1532 393 1615 420; x_wconf 89'>همکاران</span>
      <span class='ocrx_word' id='word_1_209' title='bbox 1432 393 1524 422; x_wconf 86'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_210' title='bbox 1367 389 1422 420; x_wconf 90'>گاهی</span>
      <span class='ocrx_word' id='word_1_211' title='bbox 1251 393 1359 420; x_wconf 75'>مقاله‌هایی</span>
      <span class='ocrx_word' id='word_1_212' title='bbox 1229 393 1242 420; x_wconf 93'>را</span>
      <span class='ocrx_word' id='word_1_213' title='bbox 1184 393 1220 414; x_wconf 83'>که</span>
      <span class='ocrx_word' id='word_1_214' title='bbox 1107 393 1139 420; x_wconf 93'>احساس</span>
      <span class='ocrx_word' id='word_1_215' title='bbox 1023 393 1098 420; x_wconf 87'>می‌کنند</span>
      <span class='ocrx_word' id='word_1_216' title='bbox 934 393 1008 420; x_wconf 92'>مناسب</span>
      <span class='ocrx_word' id='word_1_217' title='bbox 894 393 925 420; x_wconf 89'>یک</span>
      <span class='ocrx_word' id='word_1_218' title='bbox 791 393 885 414; x_wconf 93'>دانشنامه</span>
      <span class='ocrx_word' id='word_1_219' title='bbox 711 398 783 420; x_wconf 45'>نیست</span>
      <span class='ocrx_word' id='word_1_220' title='bbox 647 393 703 420; x_wconf 73'>تغییر</span>
      <span class='ocrx_word' id='word_1_221' title='bbox 623 385 644 426; x_wconf 89'>یا</span>
      <span class='ocrx_word' id='word_1_222' title='bbox 559 393 621 420; x_wconf 87'>انتقال</span>
      <span class='ocrx_word' id='word_1_223' title='bbox 505 393 550 414; x_wconf 92'>داده</span>
      <span class='ocrx_word' id='word_1_224' title='bbox 484 393 496 420; x_wconf 82'>يا</span>
      <span class='ocrx_word' id='word_1_225' title='bbox 417 393 475 414; x_wconf 93'>حذف</span>
      <span class='ocrx_word' id='word_1_226' title='bbox 319 393 408 420; x_wconf 87'>می‌کنند.</span>
      <span class='ocrx_word' id='word_1_227' title='bbox 236 393 311 420; x_wconf 81'>تعاریف</span>
      <span class='ocrx_word' id='word_1_228' title='bbox 156 390 227 420; x_wconf 91'>فرهنگ</span>
      <span class='ocrx_word' id='word_1_229' title='bbox 84 393 147 420; x_wconf 91'>واژه‌ها</span>
     </span>
     <span class='ocr_line' id='line_1_9' title="bbox 1125 433 2537 466; baseline 0.001 -8; x_size 36.253193; x_descenders 6; x_ascenders 9.2531919">
      <span class='ocrx_word' id='word_1_230' title='bbox 2436 437 2537 462; x_wconf 19'>(01606/5)</span>
      <span class='ocrx_word' id='word_1_231' title='bbox 2413 437 2425 464; x_wconf 72'>یا</span>
      <span class='ocrx_word' id='word_1_232' title='bbox 2356 437 2402 464; x_wconf 93'>اصل</span>
      <span class='ocrx_word' id='word_1_233' title='bbox 2284 437 2348 464; x_wconf 91'>متن‌ها</span>
      <span class='ocrx_word' id='word_1_234' title='bbox 2251 424 2275 470; x_wconf 93'>از</span>
      <span class='ocrx_word' id='word_1_235' title='bbox 2181 433 2274 464; x_wconf 83'>اینگونه</span>
      <span class='ocrx_word' id='word_1_236' title='bbox 2094 437 2172 458; x_wconf 81'>مقاله‌ها</span>
      <span class='ocrx_word' id='word_1_237' title='bbox 2006 443 2085 458; x_wconf 93'>هستند.</span>
      <span class='ocrx_word' id='word_1_238' title='bbox 1943 434 1997 464; x_wconf 89'>گاهی</span>
      <span class='ocrx_word' id='word_1_239' title='bbox 1813 437 1934 464; x_wconf 83'>ویرایش‌های</span>
      <span class='ocrx_word' id='word_1_240' title='bbox 1727 437 1805 458; x_wconf 93'>مختلف</span>
      <span class='ocrx_word' id='word_1_241' title='bbox 1627 437 1719 466; x_wconf 56'>ویکی‌پدیا</span>
      <span class='ocrx_word' id='word_1_242' title='bbox 1572 437 1616 464; x_wconf 86'>برای</span>
      <span class='ocrx_word' id='word_1_243' title='bbox 1520 442 1563 464; x_wconf 92'>خود</span>
      <span class='ocrx_word' id='word_1_244' title='bbox 1460 437 1511 464; x_wconf 93'>سبک</span>
      <span class='ocrx_word' id='word_1_245' title='bbox 1362 437 1451 464; x_wconf 92'>نوشتاری</span>
      <span class='ocrx_word' id='word_1_246' title='bbox 1284 437 1353 464; x_wconf 91'>خاصی</span>
      <span class='ocrx_word' id='word_1_247' title='bbox 1222 437 1275 464; x_wconf 80'>ایجاد</span>
      <span class='ocrx_word' id='word_1_248' title='bbox 1125 437 1213 464; x_wconf 83'>می‌کنند.</span>
     </span>
    </p>
   </div>
   <div class='ocr_carea' id='block_1_4' title="bbox 0 410 0 414">
    <p class='ocr_par' id='par_1_5' lang='fas' title="bbox 0 410 0 414">
     <span class='ocr_line' id='line_1_10' title="bbox 0 410 0 414; x_size 0; x_descenders -0; x_ascenders 0">
      <span class='ocrx_word' id='word_1_249' title='bbox 0 410 0 414; x_wconf 95'> </span>
     </span>
    </p>
   </div>
  </div>
 </body>
</html>
`;
});
