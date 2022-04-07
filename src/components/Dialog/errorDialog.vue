<template lang="pug">
    //- v-dialog(v-model='errorDialog' width='360' persistent content-class='statusDialog')
        //- error-dialog(@emitErrorDialog='onEmitErrorDialog' :errorMessage='errorMessage')
    v-card
        v-card-title.d-flex.align-center.flex-column.justify-center.py-8
            v-icon(size='70' color='orange') icon-chat
        v-card-text.pt-0.px-5.pb-8
            div(class='font_arial' v-html='errorMessage')
        v-card-actions.px-2.pb-5
            v-row
                v-col.pr-2(cols='6')
                    v-btn(:ripple='false' @click='onCancel' width='100%' height='40' color='cancel' depressed='depressed' dark='dark') 取消
                v-col.pl-2(cols='6')
                    v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed='depressed' dark='dark') 確認
</template>
o
<script>
	import Vue from 'vue';

	export default Vue.extend({
        props: {
            errorMessage: {
                type: String,
                required: true,
            },
        },
        methods: {
			onConfirm() {
				this.$emit('emitErrorDialog', true);
			},
			onCancel() {
				this.$emit('emitErrorDialog', false);
			},
		}
	});
</script>