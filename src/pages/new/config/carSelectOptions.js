const carSelectOptions = [{
  name: '默认排序',
  currentName: null,
  search: 'stored',
  active: 0,
  options: [{
    tag: '默认排序',
    filed: '',
    order: '',
  },
  {
    tag: '销量最高',
    filed: 'sale',
    order: 'desc',
  },
  {
    tag: '首付最低',
    filed: 'payment',
    order: 'asc',
  },
  {
    tag: '车价最低',
    filed: 'price',
    order: 'asc',
  },
  {
    tag: '车价最高',
    filed: 'price',
    order: 'desc',
  },
  ],
},
{
  name: '品牌',
  currentName: null,
  active: null,
  search: 'brand',
  options: [],
},
{
  name: '首付',
  currentName: null,
  active: null,
  search: 'downPay',
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
  search: 'price',
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
    tag: '30-50万',
  },
  {
    tag: '50万以上',
  },
  ],
},
];

export default carSelectOptions;
