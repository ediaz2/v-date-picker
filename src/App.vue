<script setup lang="ts">
	import CalendarRangeRoot from './components/CalendarRangeRoot.vue';
	import CalendarMultipleRoot from './components/CalendarMultipleRoot.vue';
	import CalendarSimpleRoot from './components/CalendarSimpleRoot.vue';
	import CalendarHeader from './components/base/CalendarHeader.vue';
	import CalendarView from './components/base/CalendarView.vue';
	import CalendarHeading from './components/base/CalendarHeading.vue';
	import CalendarContent from './components/base/CalendarContent.vue';
	import CalendarNextButton from './components/base/CalendarNextButton.vue';
	import CalendarPrevButton from './components/base/CalendarPrevButton.vue';
	import CalendarGrid from './components/base/CalendarGrid.vue';
	import CalendarGridHeader from './components/base/CalendarGridHeader.vue';
	import CalendarGridRow from './components/base/CalendarGridRow.vue';
	import CalendarGridHeaderCell from './components/base/CalendarGridHeaderCell.vue';
	import CalendarGridBody from './components/base/CalendarGridBody.vue';
	import CalendarGridBodyCell from './components/base/CalendarGridBodyCell.vue';
	import { ref } from 'vue';
	import { getDayISO } from './utils/getDay';
	import { getLocalTimeZone } from '~/utils/getLocalTimeZone';

	const calendar = ref<Date>();
	const selected = ref<Date>();
	const calendarSimpleRef = ref<typeof CalendarSimpleRoot>();

	const calendarMultiple = ref<Date>();
	const selectedMultiple = ref<Date[]>([]);

	const calendarRange = ref<Date>();
	const selectedRange = ref<[Date, Date] | undefined>();

	const calendarRange2 = ref<Date>();
	const selectedRange2 = ref<[Date, Date] | undefined>();
</script>

<template>
	<main class="container">
		<section>
			<h2>Calendar</h2>
			<pre>{{ calendar }}</pre>
			<pre>{{ selected }}</pre>

			<button
				@click="
					calendarSimpleRef?.onSelect([
						getDayISO('2024-01-15', getLocalTimeZone()),
						new Date(),
					])
				">
				Set today
			</button>
			<CalendarSimpleRoot
				v-model:month="calendar"
				v-model:selected="selected"
				:start-of-week="1"
				locale="es-PE"
				class="calendar_root">
				<CalendarView>
					<CalendarHeader class="calendar_header">
						<CalendarPrevButton as-child>
							<button>Atras</button>
						</CalendarPrevButton>
						<CalendarHeading as="h2" />
						<CalendarNextButton />
					</CalendarHeader>
					<CalendarContent>
						<CalendarGrid class="calendar_grid">
							<CalendarGridHeader>
								<template #default="{ weekDays }">
									<CalendarGridRow>
										<CalendarGridHeaderCell
											v-for="day in weekDays"
											:key="day.day"
											:day="day"
											format="EEEEE" />
									</CalendarGridRow>
								</template>
							</CalendarGridHeader>
							<CalendarGridBody>
								<template #default="{ weeksInMonth }">
									<CalendarGridRow
										v-for="{ keyWeek, week } in weeksInMonth"
										:key="keyWeek">
										<CalendarGridBodyCell
											class="calendar_grid_body_cell"
											v-for="{ keyDay, day } in week"
											:key="keyDay"
											:day="day" />
									</CalendarGridRow>
								</template>
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarContent>
				</CalendarView>
			</CalendarSimpleRoot>
		</section>

		<section>
			<h2>Calendar Multiple</h2>
			<pre>{{ calendarMultiple }}</pre>
			<pre>{{ selectedMultiple }}</pre>
			<CalendarMultipleRoot
				v-model:month="calendarMultiple"
				v-model:selected="selectedMultiple"
				locale="es-PE"
				class="calendar_root">
				<CalendarView>
					<CalendarHeader class="calendar_header">
						<CalendarPrevButton as-child>
							<button>Atras</button>
						</CalendarPrevButton>
						<CalendarHeading as="h2" />
						<CalendarNextButton />
					</CalendarHeader>
					<CalendarContent>
						<CalendarGrid class="calendar_grid">
							<CalendarGridHeader>
								<template #default="{ weekDays }">
									<CalendarGridRow>
										<CalendarGridHeaderCell
											v-for="day in weekDays"
											:key="day.day"
											:day="day"
											format="EEEEE" />
									</CalendarGridRow>
								</template>
							</CalendarGridHeader>
							<CalendarGridBody>
								<template #default="{ weeksInMonth }">
									<CalendarGridRow
										v-for="{ keyWeek, week } in weeksInMonth"
										:key="keyWeek">
										<CalendarGridBodyCell
											class="calendar_grid_body_cell"
											v-for="{ keyDay, day } in week"
											:key="keyDay"
											:day="day" />
									</CalendarGridRow>
								</template>
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarContent>
				</CalendarView>
			</CalendarMultipleRoot>
		</section>

		<section>
			<h2>Calendar Range</h2>
			<pre>{{ calendarRange }}</pre>
			<pre>{{ selectedRange }}</pre>
			<CalendarRangeRoot
				ref="calendarSimpleRef"
				v-model:month="calendarRange"
				v-model:selected="selectedRange"
				locale="es-PE"
				class="calendar_root"
				:max-value="new Date()">
				<CalendarView>
					<CalendarHeader class="calendar_header">
						<CalendarPrevButton as-child>
							<button>Atras</button>
						</CalendarPrevButton>
						<CalendarHeading as="h2" />
						<CalendarNextButton />
					</CalendarHeader>
					<CalendarContent>
						<CalendarGrid class="calendar_grid">
							<CalendarGridHeader>
								<template #default="{ weekDays }">
									<CalendarGridRow>
										<CalendarGridHeaderCell
											v-for="day in weekDays"
											:key="day.day"
											:day="day"
											format="EEEEE" />
									</CalendarGridRow>
								</template>
							</CalendarGridHeader>
							<CalendarGridBody>
								<template #default="{ weeksInMonth }">
									<CalendarGridRow
										v-for="{ keyWeek, week } in weeksInMonth"
										:key="keyWeek">
										<CalendarGridBodyCell
											class="calendar_grid_body_cell"
											v-for="{ keyDay, day } in week"
											:key="keyDay"
											:day="day" />
									</CalendarGridRow>
								</template>
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarContent>
				</CalendarView>
			</CalendarRangeRoot>
		</section>

		<section>
			<h2>Calendar Range 2</h2>
			<pre>{{ calendarRange2 }}</pre>
			<pre>{{ selectedRange2 }}</pre>
			<CalendarRangeRoot
				ref="calendarSimpleRef"
				v-model:month="calendarRange2"
				v-model:selected="selectedRange2"
				locale="es-PE"
				class="calendar_root calendar_root--multiple"
				:max-value="new Date()">
				<CalendarView>
					<CalendarHeader class="calendar_header">
						<CalendarPrevButton as-child>
							<button>Atras</button>
						</CalendarPrevButton>
						<CalendarHeading as="h2" />
					</CalendarHeader>
					<CalendarContent>
						<CalendarGrid class="calendar_grid">
							<CalendarGridHeader>
								<template #default="{ weekDays }">
									<CalendarGridRow>
										<CalendarGridHeaderCell
											v-for="day in weekDays"
											:key="day.day"
											:day="day"
											format="EEEEE" />
									</CalendarGridRow>
								</template>
							</CalendarGridHeader>
							<CalendarGridBody>
								<template #default="{ weeksInMonth }">
									<CalendarGridRow
										v-for="{ keyWeek, week } in weeksInMonth"
										:key="keyWeek">
										<CalendarGridBodyCell
											class="calendar_grid_body_cell"
											v-for="{ keyDay, day } in week"
											:key="keyDay"
											:day="day" />
									</CalendarGridRow>
								</template>
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarContent>
				</CalendarView>
				<CalendarView :offset-month="1">
					<CalendarHeader class="calendar_header">
						<CalendarHeading as="h2" />
						<CalendarNextButton />
					</CalendarHeader>
					<CalendarContent>
						<CalendarGrid class="calendar_grid">
							<CalendarGridHeader>
								<template #default="{ weekDays }">
									<CalendarGridRow>
										<CalendarGridHeaderCell
											v-for="day in weekDays"
											:key="day.day"
											:day="day"
											format="EEEEE" />
									</CalendarGridRow>
								</template>
							</CalendarGridHeader>
							<CalendarGridBody>
								<template #default="{ weeksInMonth }">
									<CalendarGridRow
										v-for="{ keyWeek, week } in weeksInMonth"
										:key="keyWeek">
										<CalendarGridBodyCell
											class="calendar_grid_body_cell"
											v-for="{ keyDay, day } in week"
											:key="keyDay"
											:day="day" />
									</CalendarGridRow>
								</template>
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarContent>
				</CalendarView>
			</CalendarRangeRoot>
		</section>
	</main>
</template>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		padding-left: 1rem;
		padding-right: 1rem;
		background-color: #f7fafc;
	}

	.container > * {
		width: 100%;
		max-width: 100%;
		background-color: #fff;
		border-radius: 0.5rem;
		padding: 1rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
	}

	.calendar_root {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.calendar_root--multiple {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.calendar_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.calendar_grid {
		border-collapse: collapse;
		width: 100%;
	}

	.calendar_grid_body_cell > * {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.calendar_grid_body_cell[aria-disabled='true'] {
		opacity: 0.5;
	}

	.calendar_grid_body_cell[data-today='true'] {
		border: 1px solid #3182ce;
	}

	.calendar_grid_body_cell > div[aria-selected='true'] {
		background-color: #3182ce;
		color: #fff;
	}

	.calendar_grid_body_cell > div[data-selection-start='true'] {
		border-top-left-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
	}

	.calendar_grid_body_cell > div[data-selection-end='true'] {
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	.calendar_grid_body_cell
		> div[data-selection-start='true'][data-selection-end='true'] {
		border-radius: 0.5rem;
	}
</style>
