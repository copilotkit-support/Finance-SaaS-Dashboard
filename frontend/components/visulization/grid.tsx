"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type AppGridProps<TItem = unknown> = {
  /** Data items to render. If omitted, component will render children as-is. */
  data?: TItem[]
  /** Renderer for each item when using `data`. */
  renderItem?: (item: TItem, index: number) => React.ReactNode
  /** Children alternative to `data` + `renderItem`. */
  children?: React.ReactNode
  /** Grid min item width used for auto-fit behavior (e.g., 200 or "14rem"). */
  minItemWidth?: number | string
  /** Gap between items (e.g., 12 or "1rem"). */
  gap?: number | string
  /** Outer width (defaults to 100%). */
  width?: number | string
  /** Outer height (defaults to auto). */
  height?: number | string
  /** Apply themed container styles to each item. */
  itemContainer?: boolean
  /** Extra class for the outer grid container. */
  className?: string
  /** Extra class for each item container. Only applies when itemContainer is true. */
  itemClassName?: string
  /** Inline style for the outer grid container. */
  style?: React.CSSProperties
  /** Inline style for each item container. */
  itemStyle?: React.CSSProperties
  /** Padding inside each item when `itemContainer` is true. */
  itemPadding?: number | string
}

/**
 * Reusable responsive Grid component matching app theme colors.
 * Uses CSS Grid with `auto-fit` so items naturally resize and wrap.
 */
export function AppGrid<TItem = unknown>(props: AppGridProps<TItem>) {
  const {
    data,
    renderItem,
    children,
    minItemWidth = 220,
    gap = 12,
    width = "100%",
    height,
    itemContainer = true,
    className,
    itemClassName,
    style,
    itemStyle,
    itemPadding = 12,
  } = props

  const gridTemplateColumns = React.useMemo(() => {
    const minw = typeof minItemWidth === "number" ? `${minItemWidth}px` : String(minItemWidth)
    return `repeat(auto-fit, minmax(${minw}, 1fr))`
  }, [minItemWidth])

  const containerStyle = React.useMemo<React.CSSProperties>(() => {
    const resolvedGap = typeof gap === "number" ? `${gap}px` : gap
    return {
      display: "grid",
      gridTemplateColumns,
      gap: resolvedGap,
      width,
      height,
      ...style,
    }
  }, [gridTemplateColumns, gap, width, height, style])

  const resolvedItemPadding = typeof itemPadding === "number" ? `${itemPadding}px` : itemPadding

  const renderChildren = () => {
    if (Array.isArray(data) && renderItem) {
      return data.map((item, idx) =>
        itemContainer ? (
          <div
            key={idx}
            className={cn(
              // Use theme-aware tokens for color and borders
              "bg-card text-foreground border rounded-lg shadow-sm",
              // Subtle hover using accent color; respects dark/light themes
              "hover:bg-accent/50 transition-colors",
              itemClassName
            )}
            style={{ padding: resolvedItemPadding, ...itemStyle }}
          >
            {renderItem(item, idx)}
          </div>
        ) : (
          <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
        )
      )
    }

    // If no data provided, fall back to rendering children directly
    if (!children) return null
    return itemContainer ? (
      React.Children.map(children, (child, idx) => (
        <div
          key={idx}
          className={cn(
            "bg-card text-foreground border rounded-lg shadow-sm",
            "hover:bg-accent/50 transition-colors",
            itemClassName
          )}
          style={{ padding: resolvedItemPadding, ...itemStyle }}
        >
          {child}
        </div>
      ))
    ) : (
      <>{children}</>
    )
  }

  return (
    <div className={cn(className)} style={containerStyle}>
      {renderChildren()}
    </div>
  )
}

export default AppGrid


