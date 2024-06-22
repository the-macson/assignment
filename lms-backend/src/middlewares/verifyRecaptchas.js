exports.verifyRecaptchas = async (req, res, next) => {
  try {
    const token = req.body.token;
    let formData = new FormData();
    formData.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    formData.append("response", token);
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!data.success) {
      return res.status(400).send({ message: "Recaptcha verification failed" });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
};
