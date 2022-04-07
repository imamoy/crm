<template lang="pug">
    //- v-dialog(v-model='successDialog' width='360' persistent content-class='statusDialog')
        //- success-dialog(@emitSuccessDialog='onEmitSuccessDialog')
    v-card
        v-card-title.d-flex.align-center.flex-column.justify-center.pt-8
            v-icon(size='70' color='success') icon-success
            h3.mt-4.mb-0 SUCCESS
        v-card-actions.pa-5
            v-btn(:ripple='false' @click='onConfirm' width='100%' height='40' color='success' depressed='depressed' dark='dark') 確認
</template>

<script>
	import Vue from 'vue';

	export default Vue.extend({
        methods: {
			onConfirm() {
				this.$emit('emitSuccessDialog', true);
			},
		}
	});
</script>