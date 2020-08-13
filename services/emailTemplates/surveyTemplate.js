const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
		<html>
			<body>
				<div style="text-align: center;">
				<h2>I'd like your input about the following product!</h3>
				<p style="font-size: 16px; color: black;">Please answer the following question:</p>
				<p>${survey.body}</p>
				<div>
					<a style="font-size: 20px; margin-right: 10px;" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					<a style="font-size: 20px; margin-left: 10px;" href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
				</div>
				</div>
			</body>
		</html>
	`;
};
