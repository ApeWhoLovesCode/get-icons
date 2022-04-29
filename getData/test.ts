interface Person {
  name: string
  age: number
}

type Names = 'zhangsan' | 'lisi' | 'wangwu'

const list: Record<Names, Person> = {
  zhangsan: {age: 12, name: 'aa'},
  lisi: {age: 14, name: 'bb'},
  wangwu: {age: 18, name: 'cc'},
}
console.log('list: ', list);
