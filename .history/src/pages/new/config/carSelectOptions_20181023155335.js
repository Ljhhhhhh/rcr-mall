const carSelectOptions = [{
  name: '默认排序',
  currentName: null,
  class: 'orderby-select_default',
  active: 0,
  options: [{
    tag: '默认排序',
  },
  {
    tag: '销量最高',
  },
  {
    tag: '首付最低',
  },
  {
    tag: '月供最低',
  },
  {
    tag: '车价最低',
  },
  {
    tag: '车价最高',
  },
  ],
},
{
  name: '品牌',
  currentName: null,
  active: null,
  class: 'orderby-select_brand',
  options: [],
},
{
  name: '首付',
  currentName: null,
  active: null,
  class: 'orderby-select_first',
  options: [{
    tag: '1万以内',
  },
  {
    tag: '1-2万',
  },
  {
    tag: '2-3万',
  },
  {
    tag: '3-4万',
  },
  {
    tag: '4-5万',
  },
  {
    tag: '5万以上',
  },
  ],
},
{
  name: '车价',
  currentName: null,
  class: 'orderby-select_price',
  active: null,
  options: [{
    tag: '10万以内',
  },
  {
    tag: '10-15万',
  },
  {
    tag: '15-20万',
  },
  {
    tag: '20-30万',
  },
  {
    tag: '30-40万',
  },
  {
    tag: '40万',
  },
  ],
},
];

export default carSelectOptions;
