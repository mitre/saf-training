export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4eaf9f84","v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-184f4da6","v-0e503981","v-5fae495c","v-616321fb","v-6317fa9a","v-64ccd339","v-6681abd8","v-68368477","v-69eb5d16","v-6ba035b5","v-ddaa5942","v-b9c2d34a","v-2ae58894","v-59a19ede","v-08a5d2dc","v-4f4ac476","v-fffb8e28","v-4c863446","v-bf720700","v-0978b044","v-7fe15663"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slides/","keys":["v-0e503981"]}},"star":{"/":{"path":"/star/","keys":["v-4eaf9f84","v-5deafbd7","v-0c0c61ab","v-0538ff2f"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-5deafbd7","v-5c362338","v-5a814a99","v-7beb5be1","v-0f7612e9","v-0dc13a4a","v-0c0c61ab","v-0a57890c","v-08a2b06d","v-06edd7ce","v-0538ff2f","v-03842690","v-4eaf9f84"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
