import { type ThemeConfig } from 'flowbite-svelte';

export const defaultTheme: ThemeConfig = {
	label: 'text-md',
	input: {
		input: 'text-md'
	},
	radio: {
		input: 'cursor-pointer disabled:cursor-not-allowed',
		label: 'text-md cursor-pointer disabled:cursor-not-allowed'
	},
	select: {
		select: 'text-md cursor-pointer disabled:cursor-not-allowed'
	},
	button: {
		base: 'text-md cursor-pointer disabled:cursor-not-allowed'
	}
};
