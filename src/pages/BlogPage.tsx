import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Sparkles, 
  X, 
  BookOpen, 
  Share2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BlogPost } from '../types';

export const BlogPage: React.FC = () => {
  const { blogPosts, showToast } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Rituals', 'Global Sourcing', 'Sustainability', 'Ingredients'];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredPost = blogPosts[0];

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Botanical Journal</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#212E20]">
          Dispatches from the Soil
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Essays on lipid science, high-altitude harvests, generational tea masters in Kyoto, and the art of pure formulation.
        </p>
      </div>

      {/* Featured Editorial Banner */}
      {featuredPost && (
        <div 
          onClick={() => setActivePost(featuredPost)}
          className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#EDE7DC] hover:border-[#DACFBF] shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F3ECE0]">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#485E42] uppercase tracking-wider">{featuredPost.category}</span>
                <span>·</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#212E20] group-hover:text-[#485E42] transition-colors leading-snug">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-800">{featuredPost.author}</p>
                <p className="text-[11px] text-stone-400">{featuredPost.authorRole}</p>
              </div>
              <span className="text-xs font-semibold text-[#485E42] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EDE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#212E20] text-white'
                  : 'bg-white text-stone-600 hover:bg-[#EDE7DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, plants..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DACFBF] rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#485E42]"
          />
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EDE7DC] hover:border-[#DACFBF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#F3ECE0]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-semibold text-[#485E42] uppercase tracking-wider">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#212E20] group-hover:text-[#485E42] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-stone-500">
                <span className="truncate max-w-[150px]">{post.author}</span>
                <span className="font-semibold text-[#485E42] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal / Reader */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-3xl w-full border border-[#E8DFD0] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#485E42]">
                {activePost.category} · {activePost.readTime}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activePost)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#212E20] leading-tight">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span>By <strong>{activePost.author}</strong> ({activePost.authorRole})</span>
                  <span>·</span>
                  <span>Published {activePost.publishedAt}</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#F3ECE0] shadow-sm">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Prose Content */}
              <div className="prose prose-stone text-sm leading-relaxed space-y-4 text-stone-700 whitespace-pre-line font-sans">
                {activePost.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-[#EDE7DC] flex flex-wrap gap-2 text-xs">
                {activePost.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-white rounded-md border border-[#E3D9C9] text-stone-600">
                    #{t}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
