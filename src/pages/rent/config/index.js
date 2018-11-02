const originFilterOptions = [
  {
    name: '品牌',
    no: 1,
    options: [],
  },
  {
    name: '价格',
    no: 2,
    active: -1,
    options: ['0-100元', '100-200元', '200-300元', '400-500元', '500元以上'],
  },
  {
    name: '类型',
    no: 3,
    options: [
      {
        type: 'mode',
        name: '车型',
        active: -1,
        options: [
          {id: 1, name: '轿车'},
          {id: 2, name: 'SUV'},
          {id: 3, name: '商务车'},
          {id: 4, name: '电动车'},
          {id: 5, name: '高端车'},
        ],
      },
      {
        type: 'speed',
        name: '变速箱',
        active: -1,
        options: [
          {id: 1, name: '手动'},
          {id: 2, name: '自动'},
        ],
      },
      {
        type: 'seat',
        name: '座位数',
        active: -1,
        options: [
          {id: 1, name: '2座'},
          {id: 2, name: '4座'},
          {id: 3, name: '5座'},
          {id: 4, name: '6座及以上'},
        ],
      },
    ],
  },
];
export default originFilterOptions;
