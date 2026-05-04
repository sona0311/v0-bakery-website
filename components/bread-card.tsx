import Image from 'next/image'
import Link from 'next/link'
import type { Bread } from '@/data/breads'

type BreadCardProps = {
  bread: Bread
}

export function BreadCard({ bread }: BreadCardProps) {
  return (
    <Link href={`/breads/${bread.id}`} className="group block">
      <article className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          <Image
            src={bread.image}
            alt={bread.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {bread.isRecommended && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
              おすすめ
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {bread.name}
          </h3>
          <p className="text-primary font-bold mt-1">
            ¥{bread.price.toLocaleString()}
          </p>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {bread.description}
          </p>
        </div>
      </article>
    </Link>
  )
}
