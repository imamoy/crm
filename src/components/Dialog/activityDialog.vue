<template lang="pug">
	//- v-dialog(v-model='activityDialog' width='470' data-app='true' persistent)
		//- activity-dialog(@emitActivityDialog='onEmitActivityDialog')
	v-card
		v-card-title.d-flex.justify-center 新增行程
		v-card-text
			v-form(v-model='activityValidate' ref='form')
				v-text-field.mb-3(v-model='activityName' label='新增標題' name='activityName' :rules='activityNameRules' required='required' large='large')
				v-radio-group.mb-2(v-model='activityType' row='row')
					v-radio(label='活動' value='radio-1')
					v-radio(label='會議' value='radio-2')
				v-row(no-gutters='no-gutters')
					v-col(cols='6')
						v-menu(ref='menu' v-model='activityDateMenu' return-value.sync='date' transition='scale-transition' offset-y='offset-y' min-width='auto')
							template(v-slot:activator='{ on, attrs }')
								v-text-field.no-border(v-model='date' label='請選擇日期' prepend-icon='mdi-calendar' v-bind='attrs' v-on='on' solo)
							v-date-picker(v-model='activityDate' no-title='no-title')
								v-spacer
								v-btn(text='text' color='primary' @click='menu = false') 取消
								v-btn(text='text' color='primary' @click='$refs.menu.save(date)') 確認
					v-col(cols='6')
						v-menu(ref='menu' v-model='activityTimeMenu' nudge-right='40' return-value.sync='time' transition='scale-transition' max-width='290px' min-width='290px')
							template(v-slot:activator='{ on, attrs }')
								v-text-field.no-border(v-model='activityTime' label='請選擇時間' prepend-icon='mdi-clock-time-four-outline' v-bind='attrs' v-on='on' solo)
							v-time-picker(v-if='activityTimeMenu' v-model='activityTime' full-width='' @click:minute='$refs.menu.save(time)')
				v-text-field.no-border(v-model='activityAccount' prepend-icon='mdi-account' solo label='新增對象')
				v-text-field.no-border(v-model='activityLocation' prepend-icon='mdi-map' solo label='新增地點')
				v-file-input.no-border(multiple='' solo label='新增附件')
				v-textarea.no-border(name='input-7-1' prepend-icon='mdi-filter-variant' rows='1' label='新增說明' solo)
		v-card-actions.px-2.py-4
			v-row
				v-col.pr-2(cols='6')
					v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed='depressed' dark='dark') 取消
				v-col.pl-2(cols='6')
					v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed='depressed' dark='dark') 新增
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
	namd: 'addActivityForm',
	data() {
		return {
			date: '',
			activityValidate: false,
			activityName: '',
			activityNameRules: [v => !!v || '標題為必填'],
			activityType: '',
			activityDateMenu: false,
			activityDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			activityTimeMenu: false,
			activityTime: null,
			activityAccount: '',
			activityLocation: '',
		}
	},
	methods: {
		validate() {
			this.$refs.form.validate()
		},
		onConfirm() {
			this.$emit('emitActivityDialog', true);
		},
		onCancel() {
			this.$emit('emitActivityDialog', false);
		},
	}
});
</script>