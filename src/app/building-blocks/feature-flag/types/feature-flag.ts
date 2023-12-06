const featureFlags = <const>[
  'CREATE_ARTICLE',
  'CREATE_SECTION',
  'ARTICLE_PAGE'
]

export type FeatureFlag = (typeof featureFlags)[number];
