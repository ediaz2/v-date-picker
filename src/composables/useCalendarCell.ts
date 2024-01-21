import { injectCalendarRoot } from '~/providers/calendar';
import { computed, ref } from 'vue';
import type { CalendarGridHeaderCellProps } from '~/types/calendar';
import { getDay } from '~/utils/getDay';

export const useCalendarCell = ({ day }: CalendarGridHeaderCellProps) => {
	const {
		selected,
		month,
		today,
		timeZone,
		locale,
		disabled,
		readOnly,
		minValue,
		maxValue,
		onAdditonalProps,
		onClick,
		onMouseEnter,
		onMouseLeave,
		onCheckSelected,
	} = injectCalendarRoot();

	const key = getDay(day.toDate(timeZone.value));
	const isToday = computed(() => today.toString() === day.toString());
	const propsEvent = { selected, day, key, timeZone: timeZone.value };
	// outside-month
	const isOutsideMonth = computed(() => day.month !== month.value.month);
	const additonalProps = computed(() => {
		if (onAdditonalProps) return onAdditonalProps(propsEvent);

		return {};
	});

	const isSelected = computed(() => {
		if (onCheckSelected) return onCheckSelected(propsEvent);

		return selected.has(key);
	});

	const label = computed(() => {
		return new Intl.DateTimeFormat(locale.value, {
			dateStyle: 'full',
			timeStyle: 'long',
			timeZone: timeZone.value,
		}).format(day.toDate(timeZone.value));
	});

	// const isSelectable = ref(props.isSelectable);
	// const isInvalid = ref(false);

	const isDisabled = computed(() => {
		if (disabled.value) return true;
		if (minValue.value) {
			return day.toDate(timeZone.value) < minValue.value;
		}
		if (maxValue.value) {
			return day.toDate(timeZone.value) > maxValue.value;
		}
		return false;
	});

	const cellProps = computed(() => ({
		role: 'gridcell',
		'aria-disabled': disabled.value || isDisabled.value || undefined,
		'aria-selected': isSelected.value || undefined,
		// 'aria-invalid': isInvalid ?? undefined,
		'data-today': isToday.value || undefined,
	}));
	// data-unavailable="true"

	const hover = ref(false);

	const buttonProps = computed(() => ({
		role: 'button',
		'aria-disabled': disabled.value || undefined,
		'aria-selected': isSelected.value || undefined,
		'aria-label': label.value,
		'data-hovered': hover.value || undefined,
		'data-outside-month': isOutsideMonth.value || undefined,
		...additonalProps.value,
		// Range selection
		onClick: () => {
			if (!readOnly.value && !isDisabled.value) {
				onClick(propsEvent);
			}
		},
		onMouseenter: () => {
			hover.value = true;
			if (!readOnly.value) {
				onMouseEnter?.(propsEvent);
			}
		},
		onMouseleave: () => {
			hover.value = false;
			if (!readOnly.value) {
				onMouseLeave?.(propsEvent);
			}
		},
	}));

	return { cellProps, buttonProps };
};
