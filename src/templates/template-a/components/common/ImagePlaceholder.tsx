import { Icon } from '@iconify/react'

interface ImagePlaceholderProps {
  /** Instructional text shown to the school admin, e.g. "Add about image". */
  label?: string
  /** iconify icon name shown above the label. */
  icon?: string
  /** Extra classes for sizing/shape (the placeholder fills its parent by default). */
  className?: string
  /**
   * Content path of the image this slot fills (e.g. "hero.slides.0.image").
   * When set, the empty placeholder becomes a clickable upload target for the
   * inline-edit layer — so an image can be ADDED, not just replaced.
   */
  editPath?: string
}

/**
 * Empty-state shown wherever an image is expected but none has been provided.
 * Renders a dashed box with an icon and an instruction so admins can see which
 * image slots still need to be filled, instead of a blank/broken area.
 */
export default function ImagePlaceholder({
  label = 'Add image',
  icon = 'lucide:image-plus',
  className = '',
  editPath,
}: ImagePlaceholderProps) {
  return (
    <div
      data-edit-img={editPath}
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-ta-surface-container border-2 border-dashed border-ta-outline-variant ${className}`}
    >
      <Icon icon={icon} className="text-4xl text-ta-outline" />
      <span className="font-(family-name:--font-ta-label-md) text-xs text-center px-3 text-ta-on-surface-variant">
        {label}
      </span>
    </div>
  )
}
