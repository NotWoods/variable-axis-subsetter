from fontTools.ttLib import TTFont

varfont = TTFont("MyVariableFont.ttf")

# return value
varfont["fvar"].axes
