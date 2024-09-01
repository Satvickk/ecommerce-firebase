export default function Brands() {
  const BRANDS_DATA = [
    {
      label: "Boat",
      imageUrl:
        "https://sp.yimg.com/ib/th?id=OIP.OOfs6GYy63TzfhcUwmsIjAHaD4&pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
    },
    {
      label: "Sony",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/rgHhWl3gkc2OIUEDKOX5Mw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/a431b671-833d-324b-9ebb-70dfb478ecb7/t_500x300",
    },
    {
      label: "JBL",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/v2cdi2cECOPXL7YDln9HPA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjMw/https://s.yimg.com/zb/imgv1/837ccffd-d8f3-351f-a512-db0f2d59ed3e/t_500x300",
    },
    {
      label: "Bose",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/IL5RE71NHuGl43w3W.68Zg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/9d358984-04fb-39e7-8b88-2eef50b8e3d5/t_500x300",
    },
    {
      label: "Apple",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/8DP.pEvw8H39uWAoQGlDZg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/2cc2074d-9408-3c85-a3a8-6bc85315781d/t_500x300",
    },
    {
      label: "Samsung",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/7.CXxxjgs46XbH0BAQSn7A--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/fb61c8b0-7ef7-35fc-8c81-12f94c74d988/t_500x300",
    },
    {
      label: "Beats",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/QMi8p2NNBRImQEApHIjwJg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/3ee511b2-2493-3c88-a612-129b72ad29d7/t_500x300",
    },
    {
      label: "Skullcandy",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/EgWQ8kY9GHVQaKzywM5pDw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/ba063787-b94d-310c-8efb-eadb0f9b37b3/t_500x300",
    },
    {
      label: "Panasonic",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/jW8zeT7VFKVtcH.1EHvi5Q--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/d3a00aa1-cecd-3219-b6ae-f8ce76ceaec1/t_500x300",
    },
    {
      label: "Philips",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/uoY_iikicYgJd9JrOgXa9w--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/9797be0f-1a9e-3fcf-a6f2-80fa0a4f382f/t_500x300",
    },
    {
      label: "LG",
      imageUrl:
        "https://tse1.mm.bing.net/th?id=OIP.AZvo_hSVeWLCExEEnVl6UAHaHa&pid=Api&P=0&h=180",
    },
    {
      label: "TCL",
      imageUrl:
        "https://s.yimg.com/fz/api/res/1.2/OY8rZ361AtnudZMo5I0o4g--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/1531b42e-a509-3fba-b192-9f2e293b976b/t_500x300",
    },
  ];

  return (
    <>
      <h1 className="divider text-2xl sm:text-3xl font-normal">Our Partners</h1>
      <div className="w-full p-8 my-3 overflow-x-scroll hide-scrollbar">
        <div className="avatar gap-20">
          {BRANDS_DATA.map((item, index) => (
            <div
              key={index}
              className="ring-primary ring-offset-base-100 w-24 sm:w-32 rounded-full ring ring-offset-2"
            >
              <img
                src={item.imageUrl}
                alt={item.label}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

