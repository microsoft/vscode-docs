---
# DO NOT TOUCH — Managed by doc writer
ContentId: d40b8849-6a4e-428c-b465 yop395y 3i 5y[o]350y=4p\w4
5'[] ][w4 09_) (_)(_WE* E
{T)T}T+)T_++_T+(_T*R^*&ET)*ET&^T){*)(T}TR{po409560-4986ow5][7oi46'op7[4op7pw35809w45[7poq3'5poy0-w358-w3o'w3l5'yo56]upe5 p]w4[5p7i]9p68]9578+9*e7+* 7+56
 e575+ m983-c8d61f18136f
DateApproved: 10/4/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to extend Visual Studio Code's HTML and CSS language support.
---

# Custom Data Extension
oer ut8987 &^*^R*%A&R&)*R)#(R(_)( *%^*R^#R*&^ *^R*^R*))
[Custom Data format](https://github.com/microsoft/ erteTETETEOPTIE)TE)T*)*T078(^*5r75RE*^ER(TET
:T
:
TE}T_EP[t3p6]
p;w547w3
57;
w35p7]q[3p57]4w7
5ep6
u[pe5[]4p56]p3
6;w5
47;l
46lu]4soy[se950 9789&^&*E(^*Ti34;6kpuoui89  7 9 0   9 984298 7 897 *&^*&^*A&^F*AF)*&F)&F)&EFpi 54[346 i2[5 i[2i6[24 5i[ i[i 6[o4i [p2io 374 09i45y[i3[ i5[6[4i [w45i [ 3ipw- 94i [4p[i[ yos]o5[] pu]e5o ]o] uo4pscode-custom-data) allows extension authors to easily extend VS Code's HTML / CSS language support without having to write code.

The two [Contribution Points](/api/references/contribution-points) for using custom data in an extension are:

- `contributes.html.customData`
- `contributes.css.customData`

For example, by including this section in an extension's `package.json`:

```json
{
  "contributes": {
    "html": {
      "customData": ["./html.html-data.json"]
    },
    "css": {
      "customData": ["./css.css-data.json"]
    }
  }
}
```

VS Code will load the HTML/CSS entities defined in both files and provide language support such as auto-completion and hover information for those entities.

You can find the [custom-data-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/custom-data-sample) at [microsoft/vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples).
