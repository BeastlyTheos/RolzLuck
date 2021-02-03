const Distrobution = require("../distrobution")

const distro1 = new Distrobution([1])
const distroNegative = new Distrobution([-3])
const distroMultiple1 = new Distrobution([4, 9])
const distroMultiple2 = new Distrobution([18, 42])
const distroD6 = new Distrobution([1, 2, 3, 4, 5, 6])

test("constructor computes proper max and min values", () => {
	expect(distro1.min).toBe(1)
	expect(distro1.max).toBe(1)
	expect(distroNegative.min).toBe(-3)
	expect(distroNegative.max).toBe(-3)
	expect(distroMultiple1.min).toBe(4)
	expect(distroMultiple1.max).toBe(9)
	expect(distroD6.min).toBe(1)
	expect(distroD6.max).toBe(6)
})
