<template lang="pug">
#LoginPage
	header
		.header-area.header-transparrent
			.main-header.header-sticky
				.container
					.row.align-items-center.justify-content-md-between
						.col-xl-2.col-md-2
						.col-xl-8.col-lg-8.col-md-8.d-md-flex.align-items-center.justify-content-md-end
							.header-right-btn.f-right.d-none.d-lg-block.ml-lg-4
								.btn.header-btn(@click='tryFree = true') Try it free
	#login
		.container
			.row
				.col-12.col-md-6
					h3.text-left.mb-5 The first CRM designed by salespeople, for salespeople.#[br]Do more to grow your business.
					img(src='../../static/loginPage/images/crm-pic.gif', alt='' width='100%')
				.col-12.col-md-6
					.login-box.my-5
						h3.mb-4 Log in
						form
							.input-group.mb-4
								input.form-control(type='text' placeholder='Account')
							.input-group.mb-4
								input.form-control(type='text' placeholder='Password')
							.input-group.mb-4
								input.form-control(type='tel' placeholder='Tenant')
							input.btn.hero-btn.w-100(type="submit", value="Login")
							.d-block.text-center.my-4(@click='forgetPassword = true') Forget password
	v-dialog(v-model='forgetPassword' max-width='500')
		v-card
			v-card-title.d-flex.justify-center.mt-2 Forget password
			v-card-text
				form
					.input-group.mb-5
						input.form-control(type='text' placeholder='Account')
					.input-group
						input.form-control(type='mail' placeholder='Email Address' inputmode='email')
			v-card-actions.px-6.mb-5
				v-row(no-gutters)
					v-col.pr-2(cols='6')
						v-btn(:ripple='false' @click='forgetPassword = false' width='100%' height='40' color='cancel' depressed dark) 取消
					v-col.pl-2(cols='6')
						v-btn(:ripple='false' width='100%' height='40' color='primary' depressed dark) 確認
	v-dialog(v-model='tryFree' max-width='500')
		v-card
			v-card-title.d-flex.justify-center.mt-2 Try CRM free for 14 days
			v-card-text
				form
					.row.px-0
						.col-6.pr-2.pl-0
							.input-group.mb-3
								input.form-control(type='text' placeholder='First Name')
						.col-6.pl-2.pr-0
							.input-group.mb-3
								input.form-control(type='text' placeholder='Last Name')
					.input-group.mb-3
						input.form-control(type='text' placeholder='Company')
					.input-group.mb-3
						input.form-control(type='text' placeholder='Role')
					.input-group.mb-3
						input.form-control(type='mail' placeholder='Email Address' inputmode='email')
					.input-group.mb-3
						input.form-control(type='tel' placeholder='Phone' inputmode='tel')
					.input-group.mb-3
						textarea.form-control(name="", cols="30", rows="5" placeholder='Message')
			v-card-actions.px-6.mb-5
				v-row(no-gutters)
					v-col.pr-2(cols='6')
						v-btn(:ripple='false' @click='tryFree = false' width='100%' height='40' color='cancel' depressed dark) 取消
					v-col.pl-2(cols='6')
						v-btn(:ripple='false' width='100%' height='40' color='primary' depressed dark) 確認
</template>
<script>
export default {
  name: "Login",
  data() {
	return {
		forgetPassword: false,
		tryFree: false,
	};
  },
};
</script>

<style scoped src="../../static/loginPage/plugins.css"></style>
<style scoped src="../../static/loginPage/common.css"></style>
<style scoped src="../../static/loginPage/login.css"></style>
