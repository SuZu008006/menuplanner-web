// import {screen} from '@testing-library/react'
// import '@testing-library/jest-dom'
// import renderApplication from './RenderApplication'
// import Menu from '../Menu'
// import MenuRepo from '../NetworkMenuRepo'
// import {AppProps} from '../App'
// import {AppPropsBuilder} from '../AppPropsBuilder'
//
// class SpyStubMenuRepo implements MenuRepo {
//     menuResult: Menu[] = [{
//         id: '', category: '', title: '', people: '',
//     }]
//     menu_returnValue: Promise<Menu[]> = Promise.resolve(this.menuResult)
//
//     menuList(): Promise<Menu[]> {
//         return this.menu_returnValue
//     }
// }
//
// describe('menu list screen', () => {
//     let spyStubMenuRepo: SpyStubMenuRepo
//     let appProps: AppProps
//
//     test('display the menu list around week', async () => {
//         spyStubMenuRepo = new SpyStubMenuRepo()
//         appProps = new AppPropsBuilder()
//             .withMenuRepo(spyStubMenuRepo)
//             .build()
//
//         const menuResult: Menu[] = [
//             {id: '1', category: 'categoryString', title: 'title1', people: 'peopleNumber'},
//             {id: '2', category: 'categoryString', title: 'title2', people: 'peopleNumber'},
//             {id: '3', category: 'categoryString', title: 'title3', people: 'peopleNumber'},
//             {id: '4', category: 'categoryString', title: 'title4', people: 'peopleNumber'},
//             {id: '5', category: 'categoryString', title: 'title5', people: 'peopleNumber'},
//             {id: '6', category: 'categoryString', title: 'title6', people: 'peopleNumber'},
//             {id: '7', category: 'categoryString', title: 'title7', people: 'peopleNumber'},
//         ]
//         spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)
//
//
//         await renderApplication('/menuList', appProps)
//
//
//         expect(screen.getByText('月')).toBeInTheDocument()
//         expect(screen.getByText('title1')).toBeInTheDocument()
//         expect(screen.getByText('火')).toBeInTheDocument()
//         expect(screen.getByText('title2')).toBeInTheDocument()
//         expect(screen.getByText('水')).toBeInTheDocument()
//         expect(screen.getByText('title3')).toBeInTheDocument()
//         expect(screen.getByText('木')).toBeInTheDocument()
//         expect(screen.getByText('title4')).toBeInTheDocument()
//         expect(screen.getByText('金')).toBeInTheDocument()
//         expect(screen.getByText('title5')).toBeInTheDocument()
//     })
// })