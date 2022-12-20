export async function setFontFace(fontData: BinaryData) {
	document.fonts.clear();
	const font = new FontFace('MyVariableFont', fontData);
	document.fonts.add(await font.load());
}
