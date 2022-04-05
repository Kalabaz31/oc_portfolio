export default{
    name:'about',
    title:'About',
    type: 'document',
    fields:[
        {
            name:'selfIntro',
            title:'SelfIntro',
            type:'string'
        },
        {
            name:'skills',
            title:'Skills',
            type:'string'
        },
        {
            name:'imgUrl',
            title:'ImgUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}