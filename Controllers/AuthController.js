let axios = require("axios");
exports.login = async function (req, res, next) {
  try {
    var responseData = [];
    // await fetch("https://rt-core.dev.radtonics.com/api/v1/users/auth/login/",
    // {
    //   Method: "POST",
    //   Body: {
    //     username: req.body.username,
    //     password: req.body.password,
    //   },
    // }).then((response) => {
    //   console.log(response);
    //   if (response.status === 405) {
    //     responseData = response.statusText;
    //     // return ;
    //     // throw new Error(response.);
    //   }else{

    //     function parseCookies(request) {
    //       const list = {};
    //       const cookieHeader = request;
    //       if (!cookieHeader) return list;

    //       cookieHeader.split(`;`).forEach(function (cookie) {
    //         let [name, ...rest] = cookie.split(`=`);
    //         name = name?.trim();
    //         if (!name) return;
    //         const value = rest.join(`=`).trim();
    //         if (!value) return;
    //         list[name] = decodeURIComponent(value);
    //       });
    //       console.log(list);
    //       return list;
    //     }
    //     response.headers.forEach((element, key) => {
    //       if (key === "set-cookie") {
    //         responseData.push(parseCookies(element));
    //       }
    //     });
    //   }
    // });

    await axios
      .post(
        "https://rt-core.dev.radtonics.com/api/v1/users/auth/login/",
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 405) {
          responseData = response.statusText;
          // return ;
          // throw new Error(response.);
        } else {
          function parseCookies(request) {
            const list = {};
            const cookieHeader = request;
            if (!cookieHeader) return list;

            cookieHeader.split(`;`).forEach(function (cookie) {
              let [name, ...rest] = cookie.split(`=`);
              name = name?.trim();
              if (!name) return;
              const value = rest.join(`=`).trim();
              if (!value) return;
              list[name] = decodeURIComponent(value);
            });
            // responseData.push(list)
            // console.log(list);
            return list;
          }
          response.headers['set-cookie'].map((element, key) => {
            // if (key === "set-cookie") {
              // responseData[responseData,...];
              responseData.push(parseCookies(element))
              // console.log();
            // }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    res.status(200).json({
      status: "200",
      message: "login successfully",
      responseData,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
  // try {
  // let email = req.body.email;

  // let data = await User.findOne({ email });

  // if (!data) {
  //   throw new Error("Please enter valid email");
  // } else {
  //   let pass = req.body.password;
  //   let checkUser = await bcrypt.compare(pass, data.password);
  //   if (!checkUser) {
  //     throw new Error("Please enter valid password");
  //   } else {
  //     var token = await jwt.sign({ data }, "malkari");
  //     res.status(200).json({
  //       status: "200",
  //       message: "login successfully",
  //       data: data,
  //       token,
  //     });
  //   }
  //   }
  // } catch (err) {
  //   res.status(200).json({
  //     status: "500",
  //     message: err.message,
  //   });
  // }
};
