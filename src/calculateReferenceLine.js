import { import as csTools } from 'cornerstone-tools'

const planePlaneIntersection = csTools('util/planePlaneIntersection')
const projectPatientPointToImagePlane = csTools('util/projectPatientPointToImagePlane')

/**
   * Calculates a reference line between two planes by projecting the top left hand corner and bottom right hand corner
   * Of the reference image onto the target image.  Ideally we would calculate the intersection between the planes but
   * That requires a bit more math and this works fine for most cases.
   *
   * @export
   * @public
   * @method
   * @name calculateReferenceLine
   * @param  {Object} targetImagePlane    The imagePlane on which the reference line will be drawn.
   * @param  {Object} referenceImagePlane The imagePlane being referenced.
   * @returns {Object}  The start and end points of the line to be drawn.
   */
export default function (targetImagePlane, referenceImagePlane) {
  const patientPoint = planePlaneIntersection(targetImagePlane, referenceImagePlane)

  if (!patientPoint) {
    return
  }

  const start = projectPatientPointToImagePlane(patientPoint.start, targetImagePlane)
  const end = projectPatientPointToImagePlane(patientPoint.end, targetImagePlane)

  return {
    start,
    end
  }
}
