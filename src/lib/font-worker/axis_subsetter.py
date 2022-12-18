from fontTools import ttLib
from fontTools.varLib.instancer import instantiateVariableFont

varfont = ttLib.TTFont("MyVariableFont.ttf")
print(varfont["fvar"].axes)
