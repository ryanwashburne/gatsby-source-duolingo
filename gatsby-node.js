const fetch = require("node-fetch");

const LANGUAGE_NODE_TYPE = `DuolingoLanguage`;

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  try {
    getNodesByType(LANGUAGE_NODE_TYPE).forEach((node) =>
      touchNode({ nodeId: node.id })
    );

    const { createNode } = actions;
    const { identifier, password, username } = pluginOptions;
    if (!identifier || !password || !username) {
      throw new Error(
        "Missing required plugin option fields (ie: identifer, password, username)"
      );
    }
    const authResponse = await fetch(
      "https://www.duolingo.com/2017-06-30/login?fields=",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }
    );
    const jwt = authResponse.headers.get("jwt");
    const response = await fetch(`https://www.duolingo.com/users/${username}`, {
      headers: {
        cookie: `jwt_token=${jwt}`,
      },
    });
    const data = await response.json();
    const { language_data } = data;
    Object.keys(language_data).forEach((languageKey) => {
      const languageData = language_data[languageKey];
      createNode({
        ...languageData,
        id: createNodeId(`${LANGUAGE_NODE_TYPE}-${languageKey}`),
        parent: null,
        children: [],
        internal: {
          type: LANGUAGE_NODE_TYPE,
          content: JSON.stringify(languageData),
          contentDigest: createContentDigest(languageData),
        },
      });
    });
  } catch (e) {
    console.error(e);
    console.error("Error fetching data from Duolingo");
  }
  return;
};
