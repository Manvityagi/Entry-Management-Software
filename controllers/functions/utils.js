function compareHostsByVisitorCount(visitorA, visitorB) {
  return visitorA.visitor_count > visitorB.visitor_count;
}

function getRenderData(req) {
  return {
    success: req.flash("success"),
    error: req.flash("error")
  };
}

module.exports = {
  compareHostsByVisitorCount,
  getRenderData
};
