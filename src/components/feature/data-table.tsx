'use client';

import * as React from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from '@tabler/icons-react';
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { toast } from 'sonner';
import { z } from 'zod';

import { useIsMobile } from '../../hooks/use-mobile';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Checkbox } from '../ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: 'Header',
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Section Type',
    cell: ({ row }) => (
      <div className="w-32">
        <Badge
          variant="outline"
          className="bg-emerald-50/90 dark:bg-emerald-900/90 text-emerald-900 dark:text-emerald-100 border-emerald-200/50 dark:border-emerald-800/50 px-1.5"
        >
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-emerald-50/90 dark:bg-emerald-900/90 text-emerald-900 dark:text-emerald-100 border-emerald-200/50 dark:border-emerald-800/50 px-1.5"
      >
        {row.original.status === 'Done' ? (
          <IconCircleCheckFilled className="fill-emerald-500 dark:fill-emerald-400" />
        ) : (
          <IconLoader className="text-emerald-500 dark:text-emerald-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'target',
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: 'Done',
            error: 'Error',
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    accessorKey: 'limit',
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: 'Done',
            error: 'Error',
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    accessorKey: 'reviewer',
    header: 'Reviewer',
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== 'Assign reviewer';

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/50 focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 transition-all duration-300 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>

            <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg">
              <SelectItem
                value="Eddie Lake"
                className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50 focus:bg-emerald-100/80 dark:focus:bg-emerald-800/50 transition-colors duration-300"
              >
                Eddie Lake
              </SelectItem>
              <SelectItem
                value="Jamik Tashpulatov"
                className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50 focus:bg-emerald-100/80 dark:focus:bg-emerald-800/50 transition-colors duration-300"
              >
                Jamik Tashpulatov
              </SelectItem>
              <SelectItem
                value="Emily Whalen"
                className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50 focus:bg-emerald-100/80 dark:focus:bg-emerald-800/50 transition-colors duration-300"
              >
                Emily Whalen
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-emerald-100/80 dark:data-[state=open]:bg-emerald-800/50 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-32 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg"
        >
          <DropdownMenuItem className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50">
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuItem className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50">
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-emerald-200/50 dark:bg-emerald-800/50" />
          <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-100/80 dark:hover:bg-red-900/50 focus:text-red-600 dark:focus:text-red-400">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/50 transition-colors duration-200 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 data-[dragging=true]:bg-emerald-100/50 dark:data-[dragging=true]:bg-emerald-800/50"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface DataTableProps {
  isDarkMode: boolean;
  data: z.infer<typeof schema>[];
}

export function DataTable({ isDarkMode: isDarkMode, data: initialData }: DataTableProps) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className={`w-full flex-col justify-start gap-6 ${isDarkMode ? 'text-white' : ''}`}
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg">
            <SelectItem
              value="outline"
              className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
            >
              Outline
            </SelectItem>
            <SelectItem
              value="past-performance"
              className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
            >
              Past Performance
            </SelectItem>
            <SelectItem
              value="key-personnel"
              className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
            >
              Key Personnel
            </SelectItem>
            <SelectItem
              value="focus-documents"
              className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
            >
              Focus Documents
            </SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg"
            >
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-emerald-50/90 dark:bg-emerald-900/90 backdrop-blur-sm sticky top-0 z-10 border-b border-emerald-200/50 dark:border-emerald-800/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="text-emerald-900 dark:text-emerald-100 font-semibold"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent
                  side="top"
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 shadow-lg"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem
                      key={pageSize}
                      value={`${pageSize}`}
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/50"
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { desktop: 186, mobile: 80 },
  { desktop: 305, mobile: 200 },
  { desktop: 237, mobile: 120 },
  { desktop: 73, mobile: 190 },
  { desktop: 209, mobile: 130 },
  { desktop: 214, mobile: 140 },
];

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 font-semibold tracking-wide transition-all duration-500 ease-in-out w-fit px-0 text-left hover:scale-105 hover:underline decoration-emerald-500/50 dark:decoration-emerald-400/50 underline-offset-4"
        >
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
        <DrawerHeader className="gap-1 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-emerald-900/20">
          <DrawerTitle className="text-emerald-900 dark:text-emerald-100">
            {item.header}
          </DrawerTitle>
          <DrawerDescription className="text-emerald-700 dark:text-emerald-300">
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-800/50">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} stroke="rgba(16, 185, 129, 0.1)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator className="bg-emerald-200/50 dark:bg-emerald-800/50" />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium text-emerald-900 dark:text-emerald-100">
                  Trending up by 5.2% this month{' '}
                  <IconTrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-emerald-700 dark:text-emerald-300">
                  Showing total visitors for the last 6 months. This is just some random text to
                  test the layout. It spans multiple lines and should wrap around.
                </div>
              </div>
              <Separator className="bg-emerald-200/50 dark:bg-emerald-800/50" />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header" className="text-emerald-900 dark:text-emerald-100">
                Header
              </Label>
              <Input
                id="header"
                defaultValue={item.header}
                className="bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100 focus:border-emerald-500 dark:focus:border-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type" className="text-emerald-900 dark:text-emerald-100">
                  Type
                </Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger
                    id="type"
                    className="w-full bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100"
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                    <SelectItem
                      value="Table of Contents"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Table of Contents
                    </SelectItem>
                    <SelectItem
                      value="Executive Summary"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Executive Summary
                    </SelectItem>
                    <SelectItem
                      value="Technical Approach"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Technical Approach
                    </SelectItem>
                    <SelectItem
                      value="Design"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Design
                    </SelectItem>
                    <SelectItem
                      value="Capabilities"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Capabilities
                    </SelectItem>
                    <SelectItem
                      value="Focus Documents"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Focus Documents
                    </SelectItem>
                    <SelectItem
                      value="Narrative"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Narrative
                    </SelectItem>
                    <SelectItem
                      value="Cover Page"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Cover Page
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status" className="text-emerald-900 dark:text-emerald-100">
                  Status
                </Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger
                    id="status"
                    className="w-full bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100"
                  >
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                    <SelectItem
                      value="Done"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Done
                    </SelectItem>
                    <SelectItem
                      value="In Progress"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="Not Started"
                      className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                    >
                      Not Started
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target" className="text-emerald-900 dark:text-emerald-100">
                  Target
                </Label>
                <Input
                  id="target"
                  defaultValue={item.target}
                  className="bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100 focus:border-emerald-500 dark:focus:border-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit" className="text-emerald-900 dark:text-emerald-100">
                  Limit
                </Label>
                <Input
                  id="limit"
                  defaultValue={item.limit}
                  className="bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100 focus:border-emerald-500 dark:focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer" className="text-emerald-900 dark:text-emerald-100">
                Reviewer
              </Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger
                  id="reviewer"
                  className="w-full bg-white/50 dark:bg-gray-900/50 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100"
                >
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                  <SelectItem
                    value="Eddie Lake"
                    className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                  >
                    Eddie Lake
                  </SelectItem>
                  <SelectItem
                    value="Jamik Tashpulatov"
                    className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                  >
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem
                    value="Emily Whalen"
                    className="text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30"
                  >
                    Emily Whalen
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-emerald-900/20">
          <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white transition-colors duration-300">
            Submit
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 transition-colors duration-300"
            >
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('mt-6', className)} {...props} />
);
SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => <div ref={ref} className={cn('px-2', className)} {...props} />);
SidebarGroupContent.displayName = 'SidebarGroupContent';
