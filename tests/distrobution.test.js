const Distrobution = require("../distrobution")

const distro1 = new Distrobution([1])
const distroNegative = new Distrobution([-3])
const distroMultiple1 = new Distrobution([4, 9])
const distroMultiple2 = new Distrobution([18, 42])
const distroD6 = new Distrobution([1, 2, 3, 4, 5, 6])

test("probabilityOfDistrabution", () => {
	expect(distro1.probabilityOfResult(1)).toBe(1)
	expect(distroNegative.probabilityOfResult(1)).toBe(-3)
	expect(distroMultiple2.probabilityOfResult(1)).toBe(18)
	expect(distroMultiple2.probabilityOfResult(2)).toBe(42)
	expect(distroD6.probabilityOfResult(5)).toBe(5)
})
