"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@/components/ui/table"

export type ColumnDef<TRow> = {
    key: keyof TRow | string
    header?: React.ReactNode
    render?: (row: TRow, rowIndex: number) => React.ReactNode
    width?: number | string
    align?: "left" | "center" | "right"
    className?: string
}

export type AppTableProps<TRow = Record<string, unknown>> = {
    data: any[]
    columns: ColumnDef<TRow>[]
    caption?: React.ReactNode
    title?: React.ReactNode
    className?: string
    /** Explicit component width (default 100%). */
    width?: number | string
    /** Minimum width of the tile (defaults to 250px). */
    minWidth?: number | string
    /** Maximum width of the tile (defaults to 350px to match charts). */
    maxWidth?: number | string
    /** Explicit component height (default auto). */
    height?: number | string
    /** Stick the header to the top when scrolling. */
    stickyHeader?: boolean
    /** Alternate row background. */
    zebra?: boolean
    /** Denser row/column padding. */
    dense?: boolean
    /** Row key getter. Defaults to index. */
    rowKey?: (row: TRow, index: number) => React.Key
    /** Optional row click handler. */
    onRowClick?: (row: TRow, index: number) => void
    /** Optional row className computed per row. */
    rowClassName?: (row: TRow, index: number) => string | undefined
}

/**
 * Reusable, theme-aware table that resizes via width/height props
 * and supports dynamic columns with custom cell renderers.
 */
export function AppTable<TRow = Record<string, unknown>>(
    props: AppTableProps<TRow>
) {
    const {
        data,
        columns,
        caption,
        title,
        className,
        width = "100%",
        minWidth = 250,
        maxWidth = 350,
        height = 260,
        stickyHeader = true,
        zebra = false,
        dense = false,
        rowKey,
        onRowClick,
        rowClassName,
    } = props

    const containerStyle = React.useMemo<React.CSSProperties>(() => {
        return {
            width,
            minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
            maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
            height,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }
    }, [width, minWidth, maxWidth, height])

    const thClassBase = cn(
        "text-foreground",
        dense ? "h-8 px-1" : "h-10 px-2"
    )

    const tdClassBase = cn(dense ? "p-1" : "p-2")

    const alignClass = (align?: "left" | "center" | "right") =>
        align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"

    return (
        <div
            className={cn(
                "rounded-2xl shadow-lg p-4 flex flex-col",
                className
            )}
            style={containerStyle}
        >
            {title ? (
                <div className="mb-2">
                    <div className="text-xl font-semibold text-gray-700 text-center">{title}</div>
                </div>
            ) : null}
            <div className="flex-1 overflow-auto">
            {
                data?.length > 0 ? (<Table>
                    {caption ? <TableCaption>{caption}</TableCaption> : null}

                    <TableHeader
                        className={cn(
                            stickyHeader && "sticky top-0 z-10 bg-card/95 backdrop-blur",
                            "border-b"
                        )}
                    >
                        <TableRow>
                            {columns?.map((col, idx) => (
                                <TableHead
                                    key={idx}
                                    className={cn(thClassBase, alignClass(col?.align), col?.className)}
                                    style={{ width: typeof col?.width === "number" ? `${col?.width}px` : col?.width }}
                                >
                                    {col?.header ?? String(col?.key)}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data[0]?.rows?.map((row: any, rowIndex: any) => {
                            // const key = rowKey ? rowKey(row, rowIndex) : rowIndex
                            return (
                                <TableRow
                                    key={rowIndex}
                                    className={cn(
                                        zebra && "odd:bg-muted/30",
                                        onRowClick && "cursor-pointer",
                                        rowClassName?.(row, rowIndex)
                                    )}
                                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                                >
                                    {row?.cells?.map((col: any, colIndex: any) => {
                                        const value = col
                                        return (
                                            <TableCell
                                                key={`${rowIndex}-${colIndex}`}
                                                className={cn(tdClassBase, alignClass("left"))}
                                            //   style={{ width: typeof col?.width === "number" ? `${col?.width}px` : col?.width }}
                                            >
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>)
                    : <></>}
            </div>
        </div>
    )
}

export default AppTable


