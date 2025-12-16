let featureFlags = {
  rag: true,
  webSearch: true,
  memory: true
};

const getFeatureFlags = () => featureFlags;

const updateFeatureFlags = async (payload = {}) => {
  featureFlags = {
    ...featureFlags,
    ...payload
  };
  return featureFlags;
};

module.exports = {
  getFeatureFlags,
  updateFeatureFlags
};
