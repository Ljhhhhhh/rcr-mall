const carSelectOptions = [{
  name: '默认排序',
  class: 'orderby-select_default',
  options: [{
    tag: '默认排序',
    active: 0,
  },
  {
    tag: '销量最高',
    active: null,
  },
  {
    tag: '首付最低',
    active: null,
  },
  {
    tag: '月供最低',
    active: null,
  },
  {
    tag: '车价最低',
    active: null,
  },
  {
    tag: '车价最高',
    active: null,
  },
  ],
},
{
  name: '品牌',
  class: 'orderby-select_brand',
  options: [],
},
{
  name: '首付',
  class: 'orderby-select_first',
  options: [{
    tag: '1万以内',
    active: null,
  },
  {
    tag: '1-2万',
    active: null,
  },
  {
    tag: '2-3万',
    active: null,
  },
  {
    tag: '3-4万',
    active: null,
  },
  {
    tag: '4-5万',
    active: null,
  },
  {
    tag: '5万以上',
    active: null,
  },
  ],
},
{
  name: '车价',
  class: 'orderby-select_price',
  options: [{
    tag: '10万以内',
    active: null,
  },
  {
    tag: '10-15万',
    active: null,
  },
  {
    tag: '15-20万',
    active: null,
  },
  {
    tag: '20-30万',
    active: null,
  },
  {
    tag: '30-40万',
    active: null,
  },
  {
    tag: '40万',
    active: null,
  },
  ],
},
];

export default carSelectOptions;
