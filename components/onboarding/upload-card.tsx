import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Check } from 'lucide-react'

interface UploadCardProps {
  label: string
  description?: string
  uploaded: boolean
  fileName?: string | null
  onUpload: () => void
  optional?: boolean
}

export function UploadCard({
  label,
  description,
  uploaded,
  fileName,
  onUpload,
  optional = false
}: UploadCardProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-base">
                {label}
              </p>
              {optional && (
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              )}
              {uploaded && (
                <Badge className="bg-success text-success-foreground gap-1">
                  <Check className="h-3 w-3" />
                  Uploaded
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {uploaded && fileName && (
              <p className="text-sm text-foreground font-medium">
                {fileName}
              </p>
            )}
          </div>
          <Button
            variant={uploaded ? "secondary" : "default"}
            size="sm"
            onClick={onUpload}
            className="gap-2 flex-shrink-0"
          >
            {uploaded ? (
              <>
                <Check className="h-4 w-4" />
                Change
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
