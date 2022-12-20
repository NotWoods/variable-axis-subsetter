from fontTools.ttlib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

varfont = TTFont("MyVariableFont.ttf")

def format_axis_limit(axis_limit):
  if axis_limit.type == 'pin':
    return axis_limit.value
  elif axis_limit.type == 'restrict':
    return (axis_limit.min, axis_limit.max)
  elif axis_limit.type == 'move':
    return (axis_limit.min, axis_limit.default, axis_limit.max)
  else:
    return None

def axis_subset(js_axis_limits):
  py_axis_limits = dict()
  for axis_tag in js_axis_limits.keys():
    py_axis_limits[axis_tag] = format_axis_limit(js_axis_limits[axis_tag])

  instantiateVariableFont(varfont, axis_limits, inplace=True)
  varfont.save("MySubsettedFont.ttf")

axis_subset
